import React, { useState } from 'react'
import styled from '@emotion/styled'
import searchIcon from '../images/searchIcon.png'

const Searchcss = styled.div`
    border: 1px solid black;
    margin: 10px 0;
    background: rgba(255,255,255,0.7);
    display: flex;
    .searchInput {
        flex: 1;
        padding: 5px;
    }
    .searchbutton {
        border: 1px solid black;
        width: 45px;
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
    const [input, setInput] = useState('')
    let text = input.length > 0 ? input : 'Search the trascriptions...'
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const submitSearch = () => {
        props.filterHandler('textFilter', input)
        props.setBoxWidth(false)
    }
    const handleKeyDown = (e) => {
        console.log('you just pressed: ' + e.keyCode)
        if(e.keyCode === 13){
            submitSearch()
         }
    }
    return (
        <Searchcss>
            <input className="searchInput" placeholder={text} value={input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <div className="searchbutton" onClick={submitSearch}></div>
        </Searchcss>
    )
}
export default Search