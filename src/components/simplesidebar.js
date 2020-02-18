import React, { useState } from 'react'
import styled from '@emotion/styled'
import SubjectFilters from './subjectfilters'
import Search from './search'
import Progress from './progressbar'
import Bluebutton from './bluebutton'
import { fonts, colors } from './styles'

export const Selectcss = styled.select`
    font-family: ${fonts.sans};
    box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
    border: 2px solid rgba(37,37,37,0.7);
    background: rgba(237,237,237,0.7);
    padding: 7px 5px 5px 5px;
    margin: 10px 0;
    height: 40px;
    line-height: 30px;
    font-size: 16px;
`
const Languages = props => {
    const languages = ['English','French','German','Italian','Welsh','Yiddish']
    const langdropdown = languages.map((l) => <option key={l} value={l} >{l}</option>)
    return (
        <Selectcss name="dropdownlanguages" className="dropdown" onChange={(e) => props.setLangFilter(e.target.value)} >
            <option value="English">Select a language...</option>
            {langdropdown}
        </Selectcss>
    )
}
const Dates = props => {
    const range = [1630, 1990]
    let decades = []
    for (let i = range[0]; i < range[1]; i += 10){
        decades.push( i === 1960 || i === 1970 ? '' : <option key={i} value={i} >{i} - {i + 9}</option>)
    }
    return (
        <Selectcss id="dropdowndecade" className="dropdown" name="dropdowndecade" defaultValue={1} onChange={(e) => props.setDateFilter(parseInt(e.target.value))}  >
            <option value={1}>Select a decade...</option>
            {decades}
        </Selectcss>
    )
}
const Sidebarcss = styled.div`
// sizes
    @media only screen and (min-width: 1200px){
        --width: 20vw;
    }
    @media only screen and (max-width: 1200px){
        --width: 35vw;
    }
    @media only screen and (max-width: 750px){
        display: none;
        // --width:  45vw;
        // transition: opacity 0.2s;
        // display: ${props => props.showSidebar ? 'flex' : 'none'};
        // opacity: ${props => props.showSidebar ? 0.99 : 0.01};
        // position: fixed;
        // z-index: 1000;
    }
    width: var(--width);
    height: 100%;
    // min-height: 100%;
    position: sticky;
    top: 4vmin;
    color: rgba(${colors.bg},1);
    .sidebarcontent {
        // height: 100%;
        overflow: auto;
        width: 75%;
        margin: 25px auto;
        padding: 15px;
        display: flex;
        flex-direction: column;
        background: rgba(${colors.bg},1);
        border: 1px solid rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
        justify-content: space-between;
        justify-content: flex-start;
        box-shadow: inset 0 0 8px rgba(${colors.fg},1);
    }
    .count {
        font-family: ${fonts.serif};
        text-align: center;
        padding-top: 10px;
    }
`
const Dropdowncss = styled.div`
    @media only screen and (min-width: 750px){
        display: none;
    }
    position: fixed;
    top: 50px;
    left: 50px;
    right: 50px;
    z-index: 1000;
    padding: 0 10px 5px 10px;
    background: rgba(${colors.bg},1);
    border: 1px solid rgba(${colors.fg},1);
    color: rgba(${colors.fg},1);
    box-shadow: inset 0 0 8px rgba(${colors.fg},1);
    .dropdowns {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        > * {
            min-width: 150px;
            // flex-basis: 150px;
            flex: 1;
        }
        select {
            
            margin-top: 0;
        }
    }
    .count {
        font-family: ${fonts.serif};
        text-align: center;
        display: block;
        width: 100%;
    }
`
export const Dropdown = props =>{
    const [input, setInput] = useState('')
    // const [reset, setReset] = useState(true)
    function resetSearchText(el){
        el.value = ''
    }
    const resetFilters = () => {
        // setReset(false)
        props.setTextFilter('')
        props.setDateFilter(1)
        props.setLangFilter('English')
        props.setSubjFilter('')
        props.setBoxWidth(true)
        const searchField = document.querySelector('.searchInput')
        searchField.value = ''
        const selectors = document.querySelectorAll('.dropdown')
        let items = Array.from(selectors).map(s => {
            s.options.selectedIndex = 0
        })
        setInput('')
    }
    return (
        <Dropdowncss showSidebar={props.showSidebar} >
            <div className="sidebarcontent">
                <Progress progress={props.progress} />
                <Search         textFilter={props.textFilter} setTextFilter={props.setTextFilter} input={input} setInput={setInput} setBoxWidth={props.setBoxWidth}/>
                <div className="dropdowns">

                <Dates          dateFilter={props.dateFilter} setDateFilter={props.setDateFilter} />
                <Languages      langFilter={props.langfinter} setLangFilter={props.setLangFilter} />
                <SubjectFilters subjFilter={props.subjFilter} setSubjFilter={props.setSubjFilter} resetFilters={resetFilters} />
                </div>
                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Bluebutton><div className={props.boxWidth ? 'button check' : 'button'} onClick={() => resetFilters()}>Reset</div></Bluebutton>
            </div>
        </Dropdowncss>
    )
}

const Sidebar = props => {
    const [input, setInput] = useState('')
    // const [reset, setReset] = useState(true)
    function resetSearchText(el){
        el.value = ''
    }
    const resetFilters = () => {
        // setReset(false)
        props.setTextFilter('')
        props.setDateFilter(1)
        props.setLangFilter('English')
        props.setSubjFilter('')
        props.setBoxWidth(true)
        const searchField = document.querySelector('.searchInput')
        searchField.value = ''
        const selectors = document.querySelectorAll('.dropdown')
        let items = Array.from(selectors).map(s => {
            s.options.selectedIndex = 0
        })
        setInput('')
    }
    return (
        <Sidebarcss showSidebar={props.showSidebar} >
            <div className="sidebarcontent">
                <Progress progress={props.progress} />
                <Search         textFilter={props.textFilter} setTextFilter={props.setTextFilter} input={input} setInput={setInput} setBoxWidth={props.setBoxWidth}/>
                <Dates          dateFilter={props.dateFilter} setDateFilter={props.setDateFilter} />
                <Languages      langFilter={props.langfinter} setLangFilter={props.setLangFilter} />
                <SubjectFilters subjFilter={props.subjFilter} setSubjFilter={props.setSubjFilter} resetFilters={resetFilters} />
                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Bluebutton><div className={props.boxWidth ? 'button check' : 'button'} onClick={() => resetFilters()}>Reset</div></Bluebutton>
            </div>
        </Sidebarcss>
    )
}

export default Sidebar