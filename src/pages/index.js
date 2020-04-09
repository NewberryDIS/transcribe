import React, { useState, useEffect, useRef } from "react"
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Masonry from 'react-masonry-css'
// import { Router } from "@reach/router"
import { Bluebutton, CoreBox } from '../components/csscomponents'
import withLocation from '../components/withlocation'
import Topbar from '../components/topbar'
import Jumbo from '../components/jumbo'
import Background from '../components/background'
import Sidebar from '../components/sidebar'
import Footer from "../components/footer"
import Box from '../components/box'
import BetaBanner from '../components/beta'

const Indexcss = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60vh;
  margin: 60vh auto 0 auto;
  // @media (min-width: 1500px){width: 80%;}
  // @media (max-width: 1500px) and (min-width: 1000px){width: 95%;}
  // @media (max-width: 900){width: 98%;}
  width: 95%;

`
const Boxescss = styled.div`
  display: flex;
  flex-wrap: nowrap;
  &.hide {
      display: none;
  }
  .sidebar {
    margin: 0 30px;
  }
  .masonry-grid {
    flex: 1;
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
  }
  .masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }
  .masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 30px;
  }
`
const Anchor = styled.div`
    position: absolute;
    top: 50vh;
    width: 5px;
    height: 5px;
    background: black;
    opacity: 0;
`
export const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  900: 1,
};

const normalizeText = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'})
const content = require('../data/content.json')
const truncator = t => t.indexOf('<') > -1 ? t.substring(0,t.indexOf('<')) + '...' : t
const filterFunctions = {
  textFFunction: (hh, nn, t) => {
    let returnArray = []
    let found = true
    let titleFound = true
    nn.length > 0 && nn.forEach(n => {
        const needle = normalizeText(n)
        const haystack = normalizeText(t)
        titleFound = ( titleFound && haystack.indexOf(needle) > -1) ? true : false
    })
    hh.forEach(h => {
        if (h.transcription.length > 0 && nn.length > 0 ) { 
            nn.forEach(n => {
                const needle = normalizeText(n)
                const haystack = normalizeText(h.transcription)
                found = ( haystack.indexOf(needle) > -1) ? true : false
                if (found || (titleFound )) {returnArray.push(h)}
            })
        }
    }) 
    return returnArray.length > 0 ? returnArray : false
  },
  langFFunction: (langArray, langFilter) => {
    langArray = langArray.map(l => l.toLowerCase())
    langFilter = langFilter.toLowerCase()
    let returnValue = langArray.indexOf(langFilter) > -1 ? true : false
    return returnValue
  },
  dateFFunction: (dateArray, dateFilter) => {
    dateFilter = parseInt(dateFilter)
    if ( dateFilter === 1 ) return true
    else if ( dateFilter === 1799 && dateArray[0] < 1799 ) return true
    else if ( dateArray.length === 1 && dateArray[0] >= dateFilter && dateArray[0] <= (dateFilter + 9) ) return true
    else if ( dateArray.length === 2 && dateArray[0] <= (dateFilter + 9) && dateArray[1] >= dateFilter ) return true
    else {
      let response = false
      for (let d in dateArray){
        if ( dateArray[d] >= dateFilter && dateArray[d] <= (dateFilter + 9) ) response = true
      }
      return response
    }
  },
  catFFunction: (catString, catFilter) => {
    catString = catString.toLowerCase()
    catFilter = catFilter.toLowerCase()
    let returnValue = catFilter.length > 0 ? (catString.indexOf(catFilter) > -1 ? true : false ): true
    return returnValue
  }
}

const IndexPage = ({ search }) => {
  let allContent = content['items'].sort((a,b) => (a.title > b.title) ? 1 : -1).sort((a,b) => (a.percentTranscribed > b.percentTranscribed) ? 1 : -1 )
  const [ showButton, setShowButton ] = useState(true)
  const progressData = content['summary']
  const [ resultCount, setResultCount ] = useState(0)
  const [ showMenu, setShowMenu ] = useState(false)
  const [ itemsToShow, setItemsToShow ] = useState(18)
  const [ filters, setFilters ] = useState({
    lang: search.lang !== undefined ? search.lang : 'English',
    cat: search.cat   !== undefined ? search.cat  : '' ,
    date: search.date !== undefined ? search.date : 1 ,
    text: search.text !== undefined ? [search.text] : [] ,
  })
  const filterContent = (content) => {
    const returnArray = content.filter(c => {
      let textResult = filters.text.length > 0 ? filterFunctions.textFFunction(c.pages, filters.text, c.title) : true
      let langResult = filterFunctions.langFFunction(c.lang, filters.lang)
      let dateResult = filterFunctions.dateFFunction(c.date, filters.date)
      let catResult = filterFunctions.catFFunction(c.category, filters.cat) 
      let returnValue = (textResult || textResult.length > 0 ) && langResult && dateResult && catResult
      return returnValue
    })
    
    return returnArray
  }
  const boxify = content => {
    let counter = 0
    if (content.length === 0 ) return <CoreBox nothing>No results.</CoreBox>
    let boxedUpContent = content.map(c => {
      counter++
        let textSearchResults = filters.text.length > 0 ? filterFunctions.textFFunction(c.pages, filters.text, c.title) : ''
        const boxProps = {
          id: c.id,
          title: c.title,
          progress: {
            count: c.count,
            transcount: c.transcount,
            percentTranscribed: c.percentTranscribed,
          },
          category: c.category,
          desc: truncator(c.desc),
          img: c.image.indexOf('default.jpg') > -1 ? c.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : c.image  + '/full/400,/0/default.jpg',
          show: counter <= itemsToShow,
      }
        // return  <Box boxProps={boxProps} key={counter} className={counter <= itemsToShow ? "item" : "item hide"} />
        return  <Box boxProps={boxProps} key={counter} filter={filters.text} textSearchResults={textSearchResults} >{c.title}</Box>
    })
    // boxedUpContent = boxedUpContent.length === 1 ? boxedUpContent.push(<div></div>) : boxedUpContent
    return boxedUpContent
  }
  const addBoxes = () => {
      setItemsToShow(itemsToShow + 18) 
  }
  const updateContent = () => {
    filteredContent = filterContent(allContent)
    boxedContent = boxify(filteredContent)
    setResultCount(boxedContent.length)
    setBoxes(boxedContent)
  }
  const firstLoad = useRef(true);
  const executeScroll = () => scrollToRef(pageTop)
  useEffect(() => {
      setItemsToShow(18)
      updateContent()
      if (firstLoad.current)  {
          firstLoad.current = false
      } else {
          executeScroll()
      }
  }, [filters])
  useEffect(() => {
      updateContent()
      setShowButton(boxedContent.length < itemsToShow ? false : true)
  }, [itemsToShow])
  useEffect(() =>{
    console.log(showMenu ? 'show' : 'no show')
  }, [showMenu])
  
  let filteredContent = filterContent(allContent)
  let boxedContent = boxify(filteredContent)
  const pageTop = useRef(null)
  const [ boxes, setBoxes ] = useState(boxedContent)
  return (
  <Indexcss>
    <Global styles={css`
      html, body {
        margin: 0;
        padding: 0;
        position: relative;
        z-index: 1;
      }
    `}/>
    <Topbar setShowMenu={setShowMenu} showMenu={showMenu} resultCount={resultCount} />
    <Jumbo />
    <BetaBanner />
    <Background />
    <Body>
      <Boxescss>
        <Anchor ref={pageTop} />
        <Sidebar progressData={progressData} setFilters={setFilters} resultCount={resultCount} showMenu={showMenu} />
        {boxes.length === 1 ? boxes : 
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column">
              {boxes}
          </Masonry>  
        }
      </Boxescss>
      <Bluebutton>
          <div className="wrapper"><div className={showButton ? 'button' : 'button inactive'} onClick={() => addBoxes()}>More</div></div>
      </Bluebutton>
    </Body>
    <Footer />
  </Indexcss>
)}

// const Boxes = props => (
 
//   <Router >

//   <Boxes path="/"  boxes={boxes} />
//   <Boxes path="/:params" boxes={boxes} />
//   </Router>
  
// )

export default withLocation(IndexPage)
