import React from "react";
import { useFetch } from "../components/hooks";
import Masonry from 'react-masonry-css'
import { breakpointColumnsObj } from './indexpage'
import Box from '../components/newbox'
import Loading from "../components/loading";

const itempages = require('../data/itempages.json')

function TextSearchResults(props) {
    let mwQueryUrl = '/mediawiki2017/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + props.textfilter
    const [ data, loading ] = useFetch(mwQueryUrl)
    let itempagearray = []
    const searchResults = data
    // console.log(data)
    // a link with readable json 
    // let mwslink = <a href={'http://publications.newberry.org/mediawiki2017/api.php?action=query&list=search&srwhat=text&srlimit=200&srsearch=' + props.textfilter} >link to search results</a>
    function boxicate(sresults) {
        // takes mediawiki pagename, parses it and converts from base64, pushes it into itempagearray 
        let b64converter = sresults.map(srrr => {
            // console.log(srrr)

            const btitle = srrr.title.split('.')
            // always starts with a . so the [0] is always ""
            const aitem = atob(btitle[1])
            let apage = atob(btitle[2])
            apage = parseInt(apage)
            const matchitem = itempages.find(ip => ip.id == aitem)
            console.log(matchitem.pages)
            // if the page isn't in the array of pages for that item, it's not added
            if (matchitem !== undefined && matchitem.pages.indexOf(apage) > -1) {
                console.log('gona look closer')
                if (itempagearray.find(ip => ip.item === aitem) === undefined ){
                    console.log('gonna push it')
                    itempagearray.push({item: aitem, pages: [{page: apage, snippet: srrr.snippet}]})
                } else {
                    console.log('not gonna push it')
                    itempagearray.find(ip => ip.item === aitem).pages.push({page: apage, snippet: srrr.snippet})
                }
            }
        })
        let boxes = itempagearray.filter(ip => props.filteredData.find(o => o.id == ip.item) !== undefined).map(ip => {
            const item = props.filteredData.find(o => o.id == ip.item)
            return <Box boxProps={item} key={ip.item} show={true} pages={ip.pages} filter={props.textfilter}/>
        })
        props.setResultCount(boxes.length)
        return boxes
    }
    return (
        <>
        {loading ? <Loading /> :
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column">
                {boxicate(searchResults.query.search)}
            </Masonry>
        }
        </>
    )
}

export default TextSearchResults 