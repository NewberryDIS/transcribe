import React, { useState } from 'react'
import styled from '@emotion/styled'
import SubjectFilters from './subjectfilters'
import Search from './search'
import Progress from './progressbar'
import { fonts, colors } from './styles'

const Selectcss = styled.select`
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
@media only screen and (max-width: 700px){
    --width:  45vw;
}
    width: var(--width);
    height: 100%;
    // min-height: 100%;
    position: sticky;
    top: 4vmin;
    color: rgba(${colors.bg},1);
    .sidebarcontent {
        height: 100%;
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
        box-shadow: inset 0 0 8px rgba(${colors.fg},1);
    }
    .count {
        font-family: ${fonts.serif};
        text-align: center;
        padding-top: 10px;
    }
`

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
        <Sidebarcss>
            <div className="sidebarcontent">
                <Progress progress={props.progress} />
                <Search         textFilter={props.textFilter} setTextFilter={props.setTextFilter} input={input} setInput={setInput} setBoxWidth={props.setBoxWidth}/>
                <Dates          dateFilter={props.dateFilter} setDateFilter={props.setDateFilter} />
                <Languages      langFilter={props.langfinter} setLangFilter={props.setLangFilter} />
                <SubjectFilters subjFilter={props.subjFilter} setSubjFilter={props.setSubjFilter} resetFilters={resetFilters} />
                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Resetbutton><div className={props.boxWidth ? 'button check' : 'button'} onClick={() => resetFilters()}>Reset</div></Resetbutton>
            </div>
        </Sidebarcss>
    )
}


const Resetbutton = styled.div`
    width: 100%;
    text-align: center;
    .button {
        font-family: ${fonts.sans};
        margin: 12px auto 25px auto;
        // margin: 25px auto;
        display: inline-block;
        width: initial;
        padding: 12px 15px ;
        border: 1px solid black;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,42,85,1);
        background: rgba(${colors.hl},0.5);
        color: rgba(${colors.fg},0.8);
        transition: background 0.5s, color 0.1s;
        &:hover {
            color: rgba(${colors.fg},1);
            background: rgba(${colors.hl},0.7);
        }
        &.inactive {
            cursor: not-allowed;
            box-shadow: inset 0 0 10px rgba(37,37,37,1);
            background: rgba(125,125,125,1);
            color: rgba(37,37,37,0.4);
            transition: background 0.5s, color 0.1s;
            &:hover {
                color: rgba(37,37,37,0.4);
                background: rgba(125,125,125,1);
            }
        }
    }
`

export default Sidebar