import React, { useState } from 'react'
import styled from '@emotion/styled'
import searchIcon from '../images/searchIcon.png'

const Search = props => {
    const [show, setShow ] = useState(false)
    const [input, setInput ] = useState('')
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const submitSearch = () => {
        props.submitSearch(input)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode == 13){
            props.submitSearch(input)
         }
    }
    let clicktext = props.width > 20 ? 'Search' :  show ? 'Hide the search' : 'Search the Transcriptions' 
    console.log(props.width)
    return (
        <Searchwrapper>
            <div className="text" onClick={() => setShow(!show)}>
                {clicktext}
            </div>
            <div className={show ? 'searchDrop show' : 'searchDrop hide'}>
                <input className="searchInput" value={input} onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} type="text" />
                <img className="searchSubmit" src={searchIcon} alt="search icon" onClick={submitSearch}/>
            </div>
        </Searchwrapper>
    )
}

const Searchwrapper = styled.div`
    margin: auto;
    text-align: center;
    font-size: 0.85rem;
    width: 100%;
    .text {
        border: 1px solid #333;
        margin: 1px;
        height: 40px;
        line-height: 40px;
    }
    .searchDrop {
        transition: all .25s ease-in-out;
        justify-content: stretch;
        margin: 0;
        cursor: pointer;
        &.hide {
            height: 1px;
            input, img {
                display: none;
            }
        }
        &.show {
            height: auto;
            display: inline-flex;
            width: 100%;
            input, img {
                display: inline-block;
            }
        }
    }
    .searchInput {
        width: calc(20vw - 74px);
        border: 1px solid #333;
        margin: 1px;
        padding: 1px 10px;
    }
    .searchSubmit {
        cursor: pointer;
        margin: 1px;
        border: 1px solid #333;
        padding: 5px;
        width: 40px;
        height: 40px;
    }
`
export default Search