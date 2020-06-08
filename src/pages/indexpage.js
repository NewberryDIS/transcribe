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
  const dataurl = '/transcription/mms-transcribe/api/items/'
  const [ data, loading ] = useFetch(dataurl, true)
  const [ itemsToShow, setItemsToShow ] = useState(17)
  const [filters, setFilters ] = useState({
    title: search !== undefined && search.title !== undefined ? search.title : '',
    lang: search !== undefined && search.lang !== undefined ? search.lang : 'English',
    category:  search !== undefined && search.cat  !== undefined ? search.cat  : '' ,
    date: search !== undefined && search.date !== undefined ? search.date : 1 ,
    text: search !== undefined && search.text !== undefined ? [search.text] : [] ,
  })
  const filteredData = data.map((i, index) => {
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
                {filters.text.length > 0 ? <TextSearchResults filteredData={filteredData} textfilter={filters.text} setResultCount={setResultCount} /> : <FilterResults itemsToShow={itemsToShow} filteredData={filteredData} setResultCount={setResultCount} />}
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
  props.setResultCount(props.filteredData.length)
  const itemBoxes = props.filteredData.map((i, index) => <Box boxProps={i} key={index} show={true}>{i.title}</Box>)

  return (
   <><Masonry
   breakpointCols={breakpointColumnsObj}
   className="masonry-grid"
   columnClassName="masonry-grid_column">
    {itemBoxes}
    </Masonry>
   </>
 )
}

const Spacer = styled.div`
  position: relative;
  width: 70vw;
`