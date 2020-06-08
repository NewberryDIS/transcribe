import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'
import { IoIosSearch } from 'react-icons/io'
import { fonts, colors, Selectcss } from './csscomponents'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import * as queryString  from 'query-string'

const Searchcss = styled.div`
    border: 1px solid black;
    margin: 5px 0;
    background: rgba(237,237,237,0.7);
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    .searchInput {
        font-family: ${fonts.sans};
        box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
        background: transparent;
        border: 1px solid rgba(0,42,85,0.5);
        flex: 1;
        padding: 0 0 0 10px;
        font-size: 12px;
        width: calc(100% - 35px);
        margin: 0;
        &::placeholder {
        text-transform: uppercase;
        }
    }
    .searchbutton {
        border: 1px solid black;
        box-shadow: inset 0 0 10px rgba(0,42,85,0.2);
        flex-basis: 35px;
        flex-shrink: 0;
        height: 30px;
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
        color: rgba(${colors.hl},1);
        cursor: pointer;
    }
    &.titlesearch {
        margin: 4px 0 8px 0;
    }
`
const Subjectcss = styled.div`
    font-family: ${fonts.sans};
    span {
        display: block;
        padding: 5px 5px 0 7px;
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        text-transform: uppercase;
    }
    ul {
        padding: 0 7px;
        margin: 10px 0;
        list-style-type: none;
    }
    li {
        text-transform: uppercase;
        font-size: 15px;
        margin: 0;
        padding: 0 0 0 5px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: border 0.1s;
        font-family: ${fonts.sans};
        text-transform: uppercase;
        background: rgba(0,0,0,0);
        &:hover {
            border: 1px solid rgba(${colors.hl}, 1);
            box-shadow:  0 0 10px rgba(${colors.fg},0.5);
        }
        &.viewall {
            font-weight: 900;
            text-align: center;
            line-height: 30px;
            height: 30px;
        }
    }
    .icon {
        vertical-align: sub;
        margin-right: 4px;
        margin-bottom: 3px;
    }
    // html:not([data-scroll='0']) {
    //     padding-top: 3em;
    //   }
    //   html:not([data-scroll='0']) header {
    //     position: fixed;
    // }
    &.droporlist {
        @media (max-width: 850px) { 
            .subjectlist {display: none;} 
            .subjectdropdown {display: block;}
        }
        @media (min-width: 850px) { 
            .subjectlist {display: block;} 
            .subjectdropdown {display: none;}
        }
        @media (max-height: 750px) { 
            .subjectlist {display: none;} 
            .subjectdropdown {display: block;}
        }
        @media (min-height: 750px) { 
            .subjectlist { display: block; } 
            .subjectdropdown { display: none; }
        }
    }
`

export const TitleSearch = props => {
    const [input, setInput] = useState('')
    let text = input.length > 0 ? input : 'Search titles...'
    const history = useHistory()
    const handleChange = (e) => {
        setInput(e.target.value.toLowerCase())
    }
    const submitSearch = () => {
        console.log(input)
        let q = queryString.parse(window.location.search)
        q = {...q, title: input}
        let s = queryString.stringify(q)
        history.push(`/?${s}`)
        props.setFilters(q)
        console.log(props.filters)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch()
        }
    }
    return (
        <Searchcss className="titlesearch">
            <input className="searchInput" placeholder={text}  value={props.input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <button className="searchbutton" onClick={submitSearch}><IoIosSearch size="1.5rem" /></button>
        </Searchcss>
    )
}

export const TextSearch = props => {
    const [input, setInput] = useState('')
    let text = input.length > 0 ? input : 'Search transcription text...'
    const history = useHistory()
    const handleChange = (e) => {
        setInput(e.target.value.toLowerCase())
    }
    const submitSearch = () => {
        console.log(input)
        let q = queryString.parse(window.location.search)
        q = {...q, text: input}
        let s = queryString.stringify(q)
        history.push(`/?${s}`)
        props.setFilters(q)
        console.log(props.filters)
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch()
        }
    }
    return (
        <Searchcss className="text-search">
            <input className="searchInput" placeholder={text}  value={props.input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <button className="searchbutton" onClick={submitSearch}><IoIosSearch size="1.5rem" /></button>
        </Searchcss>
    )
}


export const LangSearch = props => {
    const languages = ['English','French','German','Italian','Spanish','Welsh','Yiddish']
    const langdropdown = languages.map((l) => <option key={l} value={l} >{l}</option>)
    const history = useHistory()
    const handleChange = (value) => {
        let q = queryString.parse(window.location.search)
        q = {...q, lang: value}
        let s = queryString.stringify(q)
        history.push(`/?${s}`)
        props.setFilters(q)
    }
    return (
        <Selectcss name="dropdownlanguages" className="dropdown" value={props.filters.lang} onChange={e => handleChange(e.target.value)}>
            <option value="English" >Select a language...</option>
            {langdropdown}
        </Selectcss>
    )
}
export const DateSearch = props => {
    const range = [1800, 1990]
    let decades = []
    for (let i = range[0]; i < range[1]; i += 10){
        decades.push( i === 1960 || i === 1970 ? '' : <option key={i} value={i} >{i} - {i + 9}</option>)
    }
    const history = useHistory()
    const handleChange = (value) => {
        let q = queryString.parse(window.location.search)
        q = {...q, date: value}
        let s = queryString.stringify(q)
        history.push(`/?${s}`)
        props.setFilters(q)
    }
    return (
        <Selectcss id="dropdowndecade" className="dropdown" name="dropdowndecade" value={props.filters.date}  onChange={e => handleChange(e.target.value)}> >
            <option value={1}>Select a decade...</option>
            <option key="early" value="1799" >pre-1800</option>
            {decades}
        </Selectcss>
    )
}
export const SubjSearch = props => {
    const [ checked, setChecked ] = useState(false)
    const history = useHistory()
    const handleChange = value => {
        setChecked(true)
        let q = queryString.parse(window.location.search)
        q = {...q, cat: value}
        let s = queryString.stringify(q)
        history.push(`/?${s}`)
        props.setFilters(q)
    }
    const subjectArray = [
        // "Cassettes",
        "Family papers",
        "Diaries",
        "Women",
        "World's Columbian Exposition",
        "Travelers’ writings",
        "Labor Movement",
        "Letters (Correspondence)",
        "Records (Documents)",
        "American Civil War (1861-1865)",
        // "Everett D. Graff Collection of Western Americana",
        "U.S. Western Expansion",
        "Indians of North America",
        // "Edward E. Ayer Manuscript Collection",
    ]
    const subjectList = subjectArray.sort().map((s, index) => {
        return <li key={index} onClick={() => handleChange(s)}>
            {checked ? <MdCheckBox className="icon" /> : <MdCheckBoxOutlineBlank className="icon" />}
            {
                s === 'American Civil War (1861-1865)' ? 'Civil War' : 
                s === 'Letters (Correspondence)' ? 'Letters' : 
                s === 'Records (Documents)' ? 'Records' : 
                s === 'Indians of North America' ? 'American Indians and Indigenous peoples' :
                s
            }
        </li>
    })
    const subjectDropdown = subjectArray.sort().map((s,index) => <option key={index} value={s}  >
        {   s === 'American Civil War (1861-1865)' ? 'Civil War' : 
            s === 'Letters (Correspondence)' ? 'Letters' : 
            // s === 'Letters (Documents)' ? 'Letters' : 
            s === 'Records (Documents)' ? 'Records' : 
            s
        }
        </option>
    )
    let dropOrList = props.showMenu ? css`` : css``
    return (
        <Subjectcss className="droporlist">
            <div className="subjectlist">
                <span>Select a category...</span>
                <ul>
                    {subjectList}
                </ul>
            </div>
            <div className="subjectdropdown">
                <Selectcss id="dropdownsubj" className="dropdown" name="dropdownsubj" value={props.filters.cat} onChange={e => handleChange(e.target.value)}>
                    <option value={''}>Select a category...</option>
                    {subjectDropdown}
                </Selectcss>
            </div>
        </Subjectcss>
    )
}

