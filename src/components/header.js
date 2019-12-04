import React, { useState } from 'react'
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
    .filterbox {
        
        position: relative;
    }
`
const Dropdown = styled.div`
    position: absolute;
    width: 20vw;
    top: 60px;
    left: -10px;
    margin: 5px;
    border: 5px solid ${colors.fg};
    color: ${colors.fg};
    background-color: ${colors.bg};
    .searchSelect {
        width: calc(100% - 10px);
    }
`
const FilterButton = props=> {
    const [showDropdown, setShowDropdown] = useState(false)
    const handleSelect = (e) => {
        props.setFilters(e.target.value, 'langFilter')
    }
    const handleClearClick = () => {
        props.setFilters('','titleFilter')
        props.setFilters('','textFilter')
        props.setFilters('','subjectFilter')
        props.setFilters('','langFilter')
        props.setFilters([1600, 2000],'dateFilter')
    }
    return(
        <div className="filterbox">
            <button className="filterButton" onClick={() => setShowDropdown(!showDropdown)}>Filters</button>
            {showDropdown ? 
                <Dropdown className="filterDropdown">
                    <div>
                        here be double-handled date sliders
                    </div>
                    <select className="searchSelect" onChange={(e) => handleSelect(e)}>
                        <option defaultValue value="English">English</option>
                        <option value="German">German</option>
                        <option value="Italian">Italian</option>
                        <option value="Yiddish">Yiddish</option>
                    </select>
                    <button className="searchSelect clearfilters" onClick={() => handleClearClick()}>Clear Filters</button>
                </Dropdown> :''}
        </div>
    )
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            filterType: 'titleFilter',
        };
    }
    handleSelect (e) {
        this.props.setFilters('','titleFilter')
        this.props.setFilters('','textFilter')
        this.props.setFilters('','subjectFilter')
        this.setState({filterType: e.target.value})
    }
    handleSubmit (e) {
        console.log(this.refs.searchType.value + ' : ' + this.refs.searchInput.value)
        this.setState({searchInput: e.target.value})
        this.props.setFilters(this.refs.searchInput.value, this.refs.searchType.value)
    }
    render(){
        return (
            <Hwrapper>
                <div className="logo">
                    <div className="logoleft">{logo[0]}</div>
                    <div className="logoright">{logo[1]}</div>
                </div>
                <div className="filsea">
                    <FilterButton setFilters={this.props.setFilters} />
                    <select className="searchSelect" ref="searchType" onChange={(e) => this.handleSelect(e)}>
                        <option defaultValue value="titleFilter">Title</option>
                        <option value="textFilter">Transcription Keywords</option>
                        <option value="subjectFilter">Subjects</option>
                    </select>
                    <div className="searchDiv">
                        <input className="searchInput" ref="searchInput"  type="text" placeholder="Search..."/>
                        <div className="searchButton" onClick={(e) => this.handleSubmit(e)}><Sicon /></div>
                    </div>
                </div>
            </Hwrapper>
        )
    }
}