import React, { useState } from 'react'
import styled from '@emotion/styled'
import searchIcon from '../images/searchIcon.png'
import { fonts, colors } from './styles'

const Searchcss = styled.div`
    border: 1px solid black;
    margin: 10px 0;
    background: rgba(237,237,237,0.7);
    display: flex;
    flex-wrap: no-wrap;
    overflow: hidden;
    .searchInput {
        font-family: ${fonts.sans};
        box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
        background: transparent;
        border: 1px solid rgba(0,42,85,0.5);
        flex: 1;
        padding: 0 0 0 5px;
        width: calc(100% - 35px);
        margin: 0;
    }
    .searchbutton {
        border: 1px solid black;
        box-shadow: inset 0 0 10px rgba(0,42,85,0.2);
        flex-basis: 35px;
        flex-shrink: 0;
        height: 35px;
        background: rgba(${colors.hl},0.3) url(${searchIcon});
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
        props.setTextFilter(props.input.toLowerCase())
        props.setBoxWidth(false)
        console.log(props.input)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch()
        }
    }
    return (
        <Searchcss>
            <input className="searchInput" placeholder={text} value={props.input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <div className="searchbutton" onClick={submitSearch}></div>
        </Searchcss>
    )
}
export default Search