import React, { useState } from "react";
import styled from '@emotion/styled'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetch } from '../components/hooks'
import { Link, useParams, useHistory } from 'react-router-dom'
import { items } from '../data/items.json'
import { PageProgress, ItemProgress } from '../components/progress'
import Loading from '../components/loading'
import ItemSearch from '../components/itemsearch'
import { colors, fonts, Bluebutton } from '../components/csscomponents'
import Highlighter from 'react-highlight-words'

export const Wrapper = styled.div`
    position: relative;
    margin: 10vh auto 0 auto;
    padding: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`
const Itemcss = styled.div`
    width: 60%;
    background: rgba(${colors.bg});
    color: rgba(${colors.fg});
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    margin: 80px auto;
    padding: 2vw;
    font-family: ${fonts.sans};
    border: 2px solid rgba(${colors.fg},0.7);
    h1, h3 {
        font-family: ${fonts.serif};
        margin: 12px 0;
    }
    h3 {
        font-size: 1.5rem;
    }
    ul {
        li {
            padding: 5px 0;
        }
    }
    p { 
        margin-bottom: 12px;
    }
    a {
        font-weight: 900;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        background-image: linear-gradient(transparent 1px, rgba(${colors.hl},1) 1px);
        background-size: 0% 1px;
        background-position: 0% 101%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s;
        &:hover {
            background-size: 100% 2px;
        }
        
    }
    .itemheaderimage {
        padding: 10px 20px;
        float: left;
    }
    &::after {
        content: "";
        clear: both;
        display: table;
    }
    .pages {
    }
    .infinite-scroll-component {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
    }
    .pagelink {
        flex: 1;
        min-width: 300px;
        display: block;
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        border: 2px solid rgba(${colors.fg},1);
        padding: 10px;
        margin: 10px;
    }
    .pageimage {
        height: 250px;
        border: 2px solid rgba(${colors.fg},1);
        margin: auto;
        display: block;
        max-width: 85%;
        overflow: hidden;
    }
    .pageimage, .searchResultImage {
        box-shadow:  0 0 8px rgba(${colors.fg},1);

    }
    .searchResultImage {
        margin: auto;
    }
    .srImageLink {
        flex-basis: 10vw;
        display: flex;
        justify-contents: center;
    }
    .searchResultBox {
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        border: 2px solid rgba(${colors.fg},1);
    }
    .searchResultBox, .transresult {
        width: 100%;
        padding: 10px;
        margin: 10px;
        display: flex;
        .transresult {
            flex: 1;
            flex-direction: column;
            .transtext {
                flex: 1;
            }
        }

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
    .searchRow {
        display: flex;
        justify-content: space-between;

    }
    .searchRowRight {
        display: inline-block;
        flex: 1;
        margin: 10px 0;
        }
    .transresults {
        display: flex;
        img {
            flex
        }   
    }
    .button {
        border: 1px solid  rgba(${colors.fg}, 1);
    }
    .noresults {
        font-size: 30px;
        margin: 20px auto 0 auto;
        font-family: ${fonts.serif};
    }
`

export const breakpointColumnsObj = {
    default: 3,
    1300: 2,
    900: 1,
  }
function ItemPage(props) {
    const { itemid, qtext } = useParams()
    const history = useHistory()
    const [ searchTerm, setSearchTerm ] = useState(qtext === null || qtext === undefined ? '' : qtext)
    // console.log(searchTerm)
    const [ pagesToShow, setPagesToShow ] = useState(21)

    const item = items.find(o => o.id === itemid);
    // const item = fetch(`/data/items.json`)
    //     .then((r) => r.json())
    //     .then((data) =>{
    //         data.find(o => o.id === itemid);
    //         console.log(data)
    //     })
    let itemdataurl = process.env.NODE_ENV === 'development' ? 'https://cors-anywhere.herokuapp.com/https://transcribe.newberry.org/api/files?item='  + itemid : 'https://digital.newberry.org/transcribe/omeka/api/files?item='  + itemid
    function goFunction(itemid, pageid) {
        history.push('/item/' + itemid + '/page/' + pageid)
    }
    const boxicate = (page, transtext) => <div className="searchResultBox">
        <Link to={'/item/' + itemid + '/page/' + page.id} className="srImageLink"><img className="searchResultImage" src={page.file_urls.thumbnail} /></Link>
        <div className="transresult">
            <div className="transtext">
                <Highlighter
                    className="hilitecontent"
                    highlightClassName="hilite"
                    searchWords={[searchTerm]}
                    textToHighlight={transtext}
                />
            </div>
            <Bluebutton >
                <button onClick={() => goFunction(itemid, page.id)} className="button">Go to page</button>
            </Bluebutton>
        </div>
    </div>
    const [data, loading] = useFetch(itemdataurl);
    let searchResults = searchTerm !== undefined && searchTerm.length > 0 ? data.map(d => {
        for (var et of d.element_texts){
            if (et.element.name === 'Transcription'){
                if (et.text.toLowerCase().indexOf(searchTerm) > -1){
                    return boxicate(d, et.text)
                } 
            }
        };
    }).filter(function(item){
        return typeof item !== 'undefined';  
    }) : []
    const pageBoxes = data.map((p, index) => {
        const transc = p.element_texts[1] !== undefined ? p.element_texts[1].text : ''
        const page = {
            id: p.id,
            image: p.file_urls.thumbnail,
            prog: transc.length > 0 
        }
        const box = <Link key={page.id} to ={'/item/' + itemid + '/page/' + page.id} className="pagelink">
                <img className="pageimage" src={page.image} />
                <PageProgress prog={page.prog} />
            </Link>
        return box
    }).slice(0,pagesToShow)
    function addPages(){
        let newCount = data.length < ( pagesToShow + 21 ) ? data.length : pagesToShow + 21
        setPagesToShow(newCount)
    }
  return (
        <Wrapper >
            <Itemcss>
                <div className="itemheadertext">
                    <h1>{item.title}</h1>
                    <p>{item.desc}</p>
                        <div className=""><a href={item.cataloglink} target="_blank" rel="noopener noreferrer">View Catalog Record</a></div>
                    <div className="searchRow">
                        <div className="searchRowRight"><ItemSearch itemid={itemid} setSearchTerm={setSearchTerm} /></div>
                    </div>
                    <ItemProgress itemid={itemid} pageCount={item.count} />
                    <div className="pages">
                        {loading ? <Loading pages={searchTerm.length > 0 ? searchResults.length : item.count} />: 
                            <InfiniteScroll
                                dataLength={searchTerm.length > 0 ? searchResults.length : pageBoxes.length} //This is important field to render the next data
                                next={addPages}
                                hasMore={true}
                                >
                                    {console.log(searchResults)}
                                {searchTerm.length > 0 ? searchResults.length === 0 ? <div className="noresults">No results.</div> : searchResults : pageBoxes}
                            </InfiniteScroll>
                        }
                    </div>
                </div>
            </Itemcss>
        </Wrapper>
    );
}
export default ItemPage;

// 'https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/files?item=2';

// url parser: 
// var start = et.text.indexOf('href="')
// var end = et.text.indexOf('"', start + 6)
// item.catalogLink = et.text.substring(start + 6, end).replace('&amp;', '&')
// console.log(item.catalogLink)

const NoResults = <div>No Results.</div>