import React from 'react'
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
    height: 40px;
    background: url(${searchIcon});
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    color: rgba(207,207,207,1);
    cursor: pointer;
}
`
const Search = props => {
let text = 'Search the trascriptions...'
let value  = ''
return (
    <Searchcss>
        <input  className="searchInput" placeholder={text} value={value} type="text" />
        <div className="searchbutton"></div>
    </Searchcss>
)
}
export default Search