import React, { useState } from "react";
import styled from '@emotion/styled'
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css'
import { useFetch } from "../components/hooks";
// import { location } from 'react-router-dom'
import Box from '../components/newbox'
import Loading from '../components/loading'
import Sidebar from '../components/sidebar'
import { colors, fonts } from '../components/csscomponents'
import TextSearchResults from "./tsrpage";
const queryString = require('query-string');

export const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  950: 1,
}
const dateRegex = /[0-9]{4}/g

function IndexPage (){
  const [ resultCount, setResultCount ] = useState(0)
  const search = queryString.parse(window.location.search);
    // console.log(search)
  // const dataurl = 'https://cors-anywhere.herokuapp.com/https://transcribe.newberry.org/api/items/'
  const dataurl = 'https://transcribe.newberry.org/api/items/'
  const [ data, loading ] = useFetch(dataurl, true)
  const [ itemsToShow, setItemsToShow ] = useState(17)
  const [filters, setFilters ] = useState({
    title: search !== undefined && search.title !== undefined ? search.title : '',
    lang: search !== undefined && search.lang !== undefined ? search.lang : 'English',
    category:  search !== undefined && search.cat  !== undefined ? search.cat  : '' ,
    date: search !== undefined && search.date !== undefined ? search.date : 1 ,
    text: search !== undefined && search.text !== undefined ? [search.text] : [] ,
  })
  let filteredData = data.map((i, index) => {
      let item = {
        id: i.id,
        count: i.files.count,
        date: [],
        category: '',
        image: '',
        desc: '',
        lang: '',
        title: '',
        pc: 0,
        weight: 0,
      }
      i.element_texts.map(et => {
        if (et.element.name === 'Subject'){
          item.category = et.text
        } else if (et.element.name === 'Source') {
          item.image = et.text
        } else if (et.element.name === 'Relation') {
          item.desc = et.text
        } else if (et.element.name === 'Language') {
          item.lang = et.text.length > 0 ? et.text : 'English'
        } else if (et.element.name === 'Title') {
          item.title = et.text
          var allDates = et.text.matchAll(dateRegex)
          item.date[0] = Math.min(...allDates)
          if (Math.min(...allDates) !==  Infinity)  item.date[0] = Math.min(...allDates)
          if (Math.max(...allDates) !== -Infinity)  item.date[1] = Math.max(...allDates)
          if (Math.min(...allDates) !==  Infinity && Math.max(...allDates) !== -Infinity) console.log(item)
        } else if (et.element.name === 'Percent Completed') {
          item.pc = et.text
        } else if (et.element.name === 'Weight') {
          item.weight = et.text
        } 
      })
    return item
  }).filter(i => filterFunctions(filters, i))
  function addItems(){
    let newCount = Math.min(filteredData.length, itemsToShow + 21)
    setItemsToShow(newCount)
  }
  return (
      <Boxescss>
        <Sidebar setFilters={setFilters} filters={filters} resultCount={resultCount} />
      
        {loading ? <><Loading text="Searching" /><Spacer /></> : filteredData.length > 0 ?
          <InfiniteScroll
            dataLength={resultCount} //This is important field to render the next data
            next={addItems}
            hasMore={true}
            loader={<span></span>}>
                <FilterResults itemsToShow={itemsToShow} filteredData={filteredData} setResultCount={setResultCount} />
          </InfiniteScroll>
          : <NoResults>No results.</NoResults>
        }
      </Boxescss>
  )
}

export default IndexPage

function filterFunctions(filter, item){
  let titleFFunction, langFFunction, dateFFunction, catFFunction
  titleFFunction = item.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1 ? true : false 
  langFFunction = item.lang.toLowerCase().indexOf(filter.lang.toLowerCase()) > -1 ? true : false
  filter.date = parseInt(filter.date)
  // item.date = [parseInt(item.date[0]), parseInt(item.date[1])]
  // console.log(langFFunction)
  // console.log(item.date)
  if ( filter.date === 1 || (filter.date === 1799 && item.date[0] < 1799)) {
    // console.log('first case')
    dateFFunction =  true
  } else if ( item.date.length === 1 && item.date[0] >= filter.date && item.date[0] <= (filter.date + 9) ) {
    // console.log('second case')
    dateFFunction =  true
  } else if ( item.date.length === 2 && item.date[0] <= (filter.date + 9) && item.date[1] >= filter.date ) {
    // console.log('third case')
    dateFFunction =  true
   } else {
    //  console.log('date not in range: item date: ' + item.date[0] + '; filter date : ' + filter.date)
   }
  
  // dateFFunction = (
  //   ( filter.date === 1 || (filter.date === 1799 && item.date[0] < 1799)) ||
  //   ( item.date.length === 1 && item.date[0] >= filter.date && item.date[0] <= (filter.date + 9) ) ||
  //   ( item.date.length === 2 && item.date[0] <= (filter.date + 9) && item.date[1] >= filter.date ) ) ? true : false 
  catFFunction = item.category.toLowerCase().indexOf(filter.category.toLowerCase()) > -1 ? true : false 
  const returnValue = titleFFunction && langFFunction && dateFFunction && catFFunction
  return returnValue
}


export const NoResults = styled.div`
  width: 50vw;
  width: 94%;
  height: 20vh;
  line-height: 10vh;
  font-size: 5vh;
  margin: auto;
  text-align: center;
  font-family: ${fonts.serif};
  background: rgba(${colors.bg}, 1);
  border: 2px solid rgba(${colors.hl}, 1);
  box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
`

export const Boxescss = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 60vh auto 0 auto;
  width: 100%;
   > * {
     flex: 1;
   }
  &.hide {
      display: none;
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

function FilterResults(props) {
  let mwQueryUrl = '/mediawiki2017/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + props.textfilter
  const [data, loading ] = useFetch(mwQueryUrl)
  // a link with readable json 
  // let mwslink = <a href={'http://publications.newberry.org/mediawiki2017/api.php?action=query&list=search&srwhat=text&srlimit=200&srsearch=' + props.textfilter} >link to search results</a>
  let itempagearray = []
  // takes search results from mediawiki, converts title from base64 to item/page numbers, checks to see if the page number is in the array of pages associated with that item (from itempages.json) and returns an array of items with array of pages in which the query text was found
  function processSearchResults(sresults) {
    if(props.textfilter === ''){
      return props.filteredData
    } else {

      const itempages = require('../data/itempages.json')
      // takes mediawiki pagename, parses it and converts from base64, pushes it into itempagearray 
        let b64converter = sresults.map(srrr => {
          const btitle = srrr.title.split('.')
          // always starts with a . so the [0] is always ""
          const aitem = atob(btitle[1])
          let apage = atob(btitle[2])
          apage = parseInt(apage)
          const matchitem = itempages.find(ip => ip.id == aitem)
          // if the page isn't in the array of pages for that item, it's not added
          if (matchitem !== undefined && matchitem.pages.indexOf(apage) > -1) {
            if (itempagearray.find(ip => ip.item === aitem) === undefined ){
            itempagearray.push({item: aitem, pages: [{page: apage, snippet: srrr.snippet}]})
          } else {
            itempagearray.find(ip => ip.item === aitem).pages.push({page: apage, snippet: srrr.snippet})
          }
        }
      })
      let filterFilteredData = props.filteredData.filter(fd => itempagearray.find(ip => ip.item == fd.id) !== undefined).map(fd => {
        const item = itempagearray.find(ip => ip.item == fd.id)
        fd.pages = item.pages
        return fd
      })
      return filterFilteredData
    }
  }
  function boxify(data) {
    const textFilteredData = processSearchResults(data)
    props.setResultCount(textFilteredData.length)
    return textFilteredData.slice(0,props.itemsToShow).map((i, index) => <Box boxProps={i} pages={i.pages !== undefined ? i.pages : null} key={index} show={true}>{i.title}</Box>)

  }


  return (
   <>
   
   {loading ? <Loading /> :
   <Masonry
   breakpointCols={breakpointColumnsObj}
   className="masonry-grid"
   columnClassName="masonry-grid_column">
    {boxify(data.query.search)}
    </Masonry>
}
   </>
 )
}

const Spacer = styled.div`

  position: relative;
  width: 50vw;
`

// function textFilter(filter, data){

//   if (filter === '' ){
//     return data
//   } else {
//     const itempages = require('../data/itempages.json')
//     let mwQueryUrl = '/mediawiki2017/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + filter
//     const getItem = () => {
//       // console.log('firing')
//       fetch(mwQueryUrl)
//           .then(response => response.json())
//           .then(data => processSearchResults(data));
//     }
//     let itempagearray = []
//     function processSearchResults(sresults) {
//       // takes mediawiki pagename, parses it and converts from base64, pushes it into itempagearray 
//       let b64converter = sresults.map(srrr => {
//           const btitle = srrr.title.split('.')
//           // always starts with a . so the [0] is always ""
//           const aitem = atob(btitle[1])
//           let apage = atob(btitle[2])
//           apage = parseInt(apage)
//           const matchitem = itempages.find(ip => ip.id == aitem)
//           // if the page isn't in the array of pages for that item, it's not added
//           if (matchitem !== undefined && matchitem.pages.indexOf(apage) > -1) {
//               if (itempagearray.find(ip => ip.item === aitem) === undefined ){
//                   itempagearray.push({item: aitem, pages: [{page: apage, snippet: srrr.snippet}]})
//               } else {
//                   itempagearray.find(ip => ip.item === aitem).pages.push({page: apage, snippet: srrr.snippet})
//               }
//           }
//       })
//     }
//     getItem()
//     let filteredFilteredData = data.filter(d => itempagearray.find(ip => ip.id == d.id) !== undefined).map(d => {
//       const ipobj = itempagearray.find(ip => ip.id == d.id)
//       d.pages = ipobj.pages 
//       return d
//     })
//     return filteredFilteredData
//   }
// }