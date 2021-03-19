import React, { useState } from "react";
import { useFetch } from "../components/hooks";
import Masonry from 'react-masonry-css'
import { breakpointColumnsObj, NoResults } from './indexpage'
import Box from '../components/newbox'
import Loading from "../components/loading";

const itempages = require('../data/itempages.json')

function TextSearchResults(props) {


    // let mwQueryUrl = 'https://cors-anywhere.herokuapp.com/https://transcribe.newberry.org/w/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + props.textfilter
    let mwQueryUrl = 'https://transcribe.newberry.org/w/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + props.textfilter
    const [ data, loading ] = useFetch(mwQueryUrl)
    // const [ itempages, iploading ] = useFetch('/data/itempages.json')
    let itempagearray = []
    const searchResults = data
    // console.log(data)
    // a link with readable json 
    // let mwslink = <a href={'http://publications.newberry.org/mediawiki2017/api.php?action=query&list=search&srwhat=text&srlimit=200&srsearch=' + props.textfilter} >link to search results</a>
    function boxicate(sresults) {
        // takes mediawiki pagename, parses it and converts from base64, pushes it into itempagearray 
        let b64converter = sresults.map(srrr => {
            console.log(srrr)

            const btitle = srrr.title.split('.')
            // always starts with a . so the [0] is always ""
            const aitem = atob(btitle[1])
            let apage = atob(btitle[2])
            apage = parseInt(apage)
            const matchitem =  itempages.find(ip => ip.id == aitem)
            // console.log(matchitem.pages)
            // if the page isn't in the array of pages for that item, it's not added
            if (matchitem  && matchitem.pages.indexOf(apage) > -1) {
                if (itempagearray.find(ip => ip.item === aitem) === undefined ){
                    itempagearray.push({item: aitem, pages: [{page: apage, snippet: srrr.snippet}]})
                } else {
                    itempagearray.find(ip => ip.item === aitem).pages.push({page: apage, snippet: srrr.snippet})
                }
            }
        })
        let textFilteredData = []
        let boxes = itempagearray.filter(ip => props.filteredData.find(o => o.id == ip.item) !== undefined).map(ip => {
            const item = props.filteredData.find(o => o.id == ip.item)
            textFilteredData.push(item)
            return <Box boxProps={item} key={ip.item} show={true} pages={ip.pages} filter={props.textfilter}/>
        })
        props.setResultCount(textFilteredData.length)
        return boxes
    }
    return (
        <>
        {loading ? <Loading /> : searchResults.query.search.length > 0 ?
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column">
                {boxicate(searchResults.query.search)}
            </Masonry> : <NoResults>No results.</NoResults>
        }
        </>
    )
}

export default TextSearchResults 