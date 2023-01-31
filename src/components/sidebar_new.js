import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'
import { fonts, colors, Bluebutton } from './csscomponents'
import { TitleSearch, TextSearch, DateSearch, LangSearch, SubjSearch } from './searchcomponents'
import { TotalProgress } from './progress'
import { HashLink  } from 'react-router-hash-link';

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
                    text-align: center;
                }
                .count {
                    font-family: ${fonts.serif};
                }
                .progress-text {
                    width: 100%;
                    
                }
                .count, .progress-text {
                    text-align: center;
                    display: block;
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
                .resetbox {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                    & > .count {
                        margin: 0px 15px;
                    }
                }
                .thanks {
                    text-align: left;
                    a {
                        font-weight: 900;
                        transition: color 0.2s;
                        text-decoration: none;
                        color: rgba(${colors.fg}, 1);
                        background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
                        background-size: 0% 2px;
                        background-position: 0% 105%;
                        background-repeat: no-repeat;
                        transition: background-size 0.2s ease 0s, color 0.2s;
                        &:hover {
                            color: rgba(${colors.fg}, 0.8);
                            background-size: 100% 3px;
                        }
                        cursor: pointer;
                    }
                }
                .t-l1 {
                    font-size: 1.4em;
                }
                .t-l2 {
                    font-size: 1.2em;
                }
                .t-l3 {
                    font-style: italic;
                    font-size: 0.9em;
                }
                .t-l4 {
                    font-size: 1em;
                }
                
            `}>
                <p className="thanks t-l1">
                Please help improve searchability for these handwritten pages from our collections on U.S. social reform in the early to mid-20th century. Learn more: <a href="https://publications.newberry.org/social-activism/"  target="_blank" rel="noopener noreferrer">Transcribing Social Activism.</a>
                </p>
                <p className="thanks t-l2">New to the site? <a href="https://publications.newberry.org/transcribe/guidelines/"  target="_blank" rel="noreferrer" >View our guidelines,</a> or simply choose a manuscript at the right and get started</p>
                <TotalProgress />
                <TitleSearch filters={props.filters} setFilters={props.setFilters} />
                <TextSearch filters={props.filters} setFilters={props.setFilters} />
                <div className="resetbox">

                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Bluebutton><div className="wrapper"><Link to="/" className="button" >Reset</Link></div></Bluebutton>
                </div>
<p className="thanks t-l4">

Many thanks to our amazing volunteers, who transcribed more than 70,000 manuscript pages previously posted to this site! Search or browse the in-progress collection here: <a href="https://collections.newberry.org/Share/5465d67708o0qorw52h84fx38w2as616"  target="_blank" rel="noopener noreferrer">Transcribed manuscripts at Newberry Digital Collections</a>
</p>
                <p className="thanks t-l3">This project was made possible in part by the Institute of Museum and Library Services [CAGML-247293-OMLS-20].</p>


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