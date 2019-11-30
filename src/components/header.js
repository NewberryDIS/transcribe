import React from 'react'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import { colors, logo, z } from '../components/pieces'
import n from '../images/Newberry_N.svg'
import Sicon from './sicon'
import styled from '@emotion/styled'

const Hwrapper = styled.header`
    width: 90%;
    margin: auto;
    position: sticky;
    top: 0px;
    display: flex;
    z-index: ${z.top};
    .logo, .filsea {
        font-weight: bold;
        flex: 1;
        display: flex;
        @media only screen and (max-width: 800px) {
            flex-direction: column;
        }
        margin: 5px;
        border: 5px solid ${colors.fg};
        color: ${colors.fg};
        background-color: ${colors.bg};
        display: flex;
        justify-content: space-between;                
        text-transform: uppercase;
        div { 
            vertical-align: middle;
            line-height: 40px;
        }
        // max-height: 60px;
    }
    .logoleft, .logoright, .filters {
        margin: 5px;
        flex: auto;
        font-weight: bold;
    }
    .logoleft {
        font-size: 24px
    }
    .logoright {
        text-align: right;
        font-size: 18px;
    }
    .filterButton, .searchInput, .searchSelect, .searchButton {
        margin: 5px;
        height: 38px;
        background-color: ${colors.bg};
        color: ${colors.fg};
        border: 1px solid white;
    }
    .searchInput, .searchButton {
        display: inline-block;
        // flex; auto;
    }
    .searchSelect {
        padding: 0 0 0 7px;
    }
    .searchDiv {
        flex: 3;
    }
    .searchInput {
        padding: 4px 0 0 7px;
        width: calc(100% - 55px);
        vertical-align: top;
    }
    .searchButton {
        width: 35px;
        text-align: center;
    } 
    .filterButton {
        line-height: 38px;
    }
`

export default class Header extends React.Component {
    handleSelect (e) {
        
    }
    render(){
        return (
            <Hwrapper>
                <div className="logo">
                    <div className="logoleft">{logo[0]}</div>
                    <div className="logoright">{logo[1]}</div>
                </div>
                <div className="filsea">
                    <button className="filterButton">Filter</button>
                    <select className="searchSelect" onChange={(e) => this.handleSelect(e)}>
                        <option defaultValue value="titleFilter">Title</option>
                        <option value="textFilter">Transcription Keywords</option>
                        <option value="subjectFilter">Subjects</option>
                    </select>
                    <div className="searchDiv">
                        <input className="searchInput" type="text" placeholder="Search..."/>
                        <div className="searchButton"><Sicon /></div>
                    </div>
                </div>
            </Hwrapper>
        )
    }
}