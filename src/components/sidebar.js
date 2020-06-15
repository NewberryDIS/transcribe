import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'
import { fonts, colors, Bluebutton } from './csscomponents'
import { TitleSearch, TextSearch, DateSearch, LangSearch, SubjSearch } from './searchcomponents'
import { TotalProgress } from './progress'

const Sidebar = props => {
    return (
        <div className="sidebar" css={css`
        
        `}>
            <div  css={css`
                background: rgba(${colors.bg}, 1);
                border: 2px solid rgba(${colors.hl}, 1);
                box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
                transition: max-height 0.4s;
                padding: 20px;
                overflow: hidden;
                margin: 0 30px 30px 30px;
                @media ( min-width: 951px ) {
                    position: sticky;
                    top: 60px;
                    display: block;
                    max-width: 30vw;
                }
                @media (max-width: 950px) {
                    position: sticky;
                    min-width: 300px;
                    // margin: 0 auto 30px auto;
                }
                > p {
                    font-family: ${fonts.serif};
                    text-transform: uppercase;
                    text-align: center;
                }
                .count {
                    font-family: ${fonts.serif};
                }
                .count, .progress-text {
                    text-align: center;
                    display: block;
                    width: 100%;
                }
                .progress-text {
                    font-family: ${fonts.sans};
                    font-size: 0.85rem;
                    text-transform: uppercase;
                }
                .menu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    border: none;
                }
                .container {
                    background: none;
                    border: none;
                    display: inline-block;
                    cursor: pointer;
                    padding: 5px 7px;
                }
                
            `}>
                <TotalProgress />
                <TitleSearch filters={props.filters} setFilters={props.setFilters} />
                <TextSearch filters={props.filters} setFilters={props.setFilters} />
                <DateSearch filters={props.filters} setFilters={props.setFilters} />
                <LangSearch filters={props.filters} setFilters={props.setFilters} />
                <SubjSearch filters={props.filters} setFilters={props.setFilters} />
                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Bluebutton><div className="wrapper"><Link to="/" className="button" >Reset</Link></div></Bluebutton>
      
            </div>
        </div>
    )
}

export const resetFilters = (e, setFilters) => {
    e.preventDefault()
    setFilters({
        lang: 'English',
        cat:  '' ,
        date: 1 ,
        text: [] ,
    })
    
    Router.push({
        pathname: '/',
        query: {},
    })
    const inputField = typeof document !== `undefined` ? document.querySelector('.searchInput') : null  
    const dropdowns = typeof document !== `undefined` ? document.querySelectorAll('.dropdown') : null  
    inputField.value = ''
    inputField.placeholder = 'Search the Transcriptions...'
    dropdowns.forEach(d => d.selectedIndex = 0) 
}

export default Sidebar