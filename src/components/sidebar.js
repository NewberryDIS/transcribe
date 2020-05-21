// import React, { useState } from 'react'
import { navigate } from 'gatsby'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'
import styled from '@emotion/styled'
import { colors, fonts, Bluebutton, CoreBox } from './csscomponents'
import Progress from './progress'
import { TextSearch, DateSearch, LangSearch, SubjSearch } from './searchcomponents'
import { numberWithCommas } from './progress'
// let SidebarCss = styled('div')`${dynamicStyle}` 

// const Loading = styled.div`
//     position: absolute;
//     top:    25px;
//     right:  25px;
//     bottom: 25px;
//     left:   25px;
//     background: rgba(${colors.bg}, 0.63);
//     border: 2px solid rgba(${colors.hl}, 0.63);
//     box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
// `

const Sidebar = props => {
    let showHideMenu = props.showMenu ? 'block' : 'none'
    return (
        <div className="sidebar" css={css`
            position: relative;
            @media ( min-width: 1300px ) { flex-basis: 20vw;  }
            @media ( min-width: 900px ) and ( max-width: 1300px ) { flex-basis: 30vw;  }
            // @media (min-width: 801) and ( max-width: 900px ) { flex-basis: 40vw; }
            // @media ( max-width: 800px) { display: ${showHideMenu}; position: absolute;}
            @media ( max-width: 900px ) { flex-basis: 40vw;  display: ${showHideMenu}; position: absolute;}
        `}>
            <CoreBox css={css`
                @media ( min-width: 901px ) {
                    position: sticky;
                    top: 60px;
                    display: block;
                }
                @media (max-width: 900px) {
                    position: fixed;
                    top: 50px;
                    left: 50px;
                    right: 50px;
                    z-index: 1000;
                    width: auto;
                }
                padding: 20px; 
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
                
            `}>
                <div className="progress-text" >{numberWithCommas(props.progressData.totalTranscount)} out of {numberWithCommas(props.progressData.totalPages)} pages transcribed!</div>
                <Progress progressData={props.progressData} />
                <TextSearch setFilters={props.setFilters} loading={props.sidebarLoading} />
                <DateSearch setFilters={props.setFilters} loading={props.sidebarLoading} />
                <LangSearch setFilters={props.setFilters} loading={props.sidebarLoading} />
                <SubjSearch setFilters={props.setFilters} loading={props.sidebarLoading} showMenu={props.showMenu} />
                <span className="count" >{ props.resultCount === 1 ? props.resultCount + ' result.' : props.resultCount + ' results.' } </span>
                <Bluebutton><div className="wrapper"><div className="button" onClick={e => resetFilters(e, props.setFilters) }>Reset</div></div></Bluebutton>
            </CoreBox>
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
    
    const inputField = typeof document !== `undefined` ? document.querySelector('.searchInput') : null  
    const dropdowns = typeof document !== `undefined` ? document.querySelectorAll('.dropdown') : null  
    inputField.value = ''
    inputField.placeholder = 'Search the Transcriptions...'
    dropdowns.forEach(d => d.selectedIndex = 0) 
    navigate('/')
}

export default Sidebar