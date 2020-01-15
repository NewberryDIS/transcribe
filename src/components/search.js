import React, { useState } from 'react'
import styled from '@emotion/styled'
import searchIcon from '../images/searchIcon.png'
import { useEffect } from 'react'

const Searchcss = styled.div`
    border: 1px solid black;
    margin: 10px 0;
    background: rgba(255,255,255,0.7);
    display: flex;
    flex-wrap: no-wrap;
    overflow: hidden;
    .searchInput {
        flex: 1;
        padding: 5px;
        width: calc(100% - 35px);
        margin: 0;
    }
    .searchbutton {
        border: 1px solid black;
        flex-basis: 35px;
        flex-shrink: 0;
        height: 35px;
        background: url(${searchIcon});
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
        color: rgba(207,207,207,1);
        cursor: pointer;
    }
`
const Search = props => {
    let text = props.input.length > 0 ? props.input : 'Search the transcriptions...'
    const handleChange = (e) => {
        props.setInput(e.target.value)
    }
    const submitSearch = () => {
        props.setTextFilter(props.input)
        console.log(props.input)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch()
        }
    }

    // useEffect(() =>{
    //     console.log('reacting')
    //     setInput('')
    // }, [props.reset])
    return (
        <Searchcss>
            <input className="searchInput" placeholder={text} value={props.input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <div className="searchbutton" onClick={submitSearch}></div>
        </Searchcss>
    )
}
export default Search