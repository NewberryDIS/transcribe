import React from 'react'
import * as JsSearch from 'js-search';
import { useState } from 'react';

import { items } from '../data/content.json'
// search.search('The');    // [theGreatGatsby, theDaVinciCode]
// search.search('scott');  // [theGreatGatsby]
// search.search('dan');    // [angelsAndDemons, theDaVinciCode]
// search.search('mystery') // [angelsAndDemons, theDaVinciCode]

const haystack = items
// const [ searchData, setSearchData ] = useState('')
// const qurry = searchData.length > 0 ? q => {
//     const res = search.search(q).map(i => <span>{i.title}</span>)
//     setSearchData(res)
// } : setSearchData(haystack.map(h => <span>{h.title}</span>))
let search = new JsSearch.Search('id')
search.addIndex('title')
search.addIndex(['transcription'])
search.addIndex(['date'])
search.addDocuments(haystack)
const Page = () => {
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchResults, setSearchResults ] = useState(haystack)
    const sercher = e => {
        setSearchQuery(e.target.value)
        searchData(e.target.value)
    }
    const searchData = e => {
        console.log(searchQuery)
        const queryResult = search.search(searchQuery) 
        // const queryResult = searchQuery.length === 0 ? search.search(e) : haystack
        console.log(queryResult)
        setSearchResults(queryResult)
    }
    const restlts = searchResults.map(i => <p>{i.title}</p>)
    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }
    const submitSearch = e => {
        searchData(searchQuery)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch(e)
        }
    }
    return (
        <div>
            <input
                id="Search"
                onChange={e => sercher(e)}
                placeholder="Enter your search here"
                style={{ margin: "0 auto", width: "400px" }}
            />

            <input className="searchInput" value={searchQuery} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <button className="searchbutton" onClick={submitSearch}>dfadf</button>
            {restlts}
        </div>
    )
}
export default Page