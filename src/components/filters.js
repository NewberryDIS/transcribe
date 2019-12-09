import React, {useState} from 'react'
import styled from "@emotion/styled"
import { colors, Cardwrapper } from "./misc"
import DateSlider from '../../cruft/prerework/dateSlider'
import Sicon from './sicon'

const Filterbox = styled.div`
    > * {
        margin: 10px;
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
    .filterButton, .searchInput, .searchSelect, .searchButton, .clearfilters {
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
    .searchSelect, .clearfilters {
        padding: 0 0 0 7px;
    }
    .searchSelect {
        width: calc(100% - 20px);
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

const Filters = props =>{
    const [lang, setLang] = useState('English')
    const [dates, setDates] = useState(props.dateFilter)
    const handleLangSelect = (e) => {
        setLang(e.target.value)
    }
    const handleApplyClick = (e) => {
        props.setFilters(lang, 'langFilter')
        props.setFilters(dates, 'dateFilter')
    }
    const handleClearClick = () => {
        props.setFilters('','titleFilter')
        props.setFilters('','textFilter')
        props.setFilters('','subjectFilter')
        props.setFilters('','langFilter')
        props.setFilters([1600, 2000],'dateFilter')
        setDates([1600,2000])
        setLang('English')
    }
    const handleSelect = (e) => {
        this.props.setFilters('','titleFilter')
        this.props.setFilters('','textFilter')
        this.props.setFilters('','subjectFilter')
        this.setState({filterType: e.target.value})
    }
    const handleSubmit = (e) => {
        console.log(this.refs.searchType.value + ' : ' + this.refs.searchInput.value)
        this.setState({searchInput: e.target.value})
        this.props.setFilters(this.refs.searchInput.value, this.refs.searchType.value)
    }
    const clearSearch =(e)=> {
        console.log(this.refs.searchType.value + ' : ' + this.refs.searchInput.value)
    }
    // onKeyDown = (e) => {
    const onKeyPress = (e) => {
        if(e.which === 13) {
            this.handleSubmit(e)
        // } else if(e.which === 27) {
        //     console.log('y9uo got it busto')
        }
    }
    return(
        <Filterbox>
            <div className="filterDropdown">
            <div className="searchDiv">
                        <input className="searchInput" ref="searchInput" onKeyPress={(e) => this.onKeyPress(e)} type="text" placeholder="Search..."/>
                        <div className="searchButton" onClick={(e) => this.handleSubmit(e)}><Sicon /></div>
                    </div>
                    <select className="searchSelect" ref="searchType" onChange={(e) => this.handleSelect(e)}>
                        <option defaultValue value="titleFilter">Title</option>
                        <option value="textFilter">Transcription Keywords</option>
                        <option value="subjectFilter">Subjects</option>
                    </select>
                <div>
                    <DateSlider storeDates={setDates} setFilters={props.setFilters} dates={dates} dateFilter={props.dateFilter} />
                </div>
                <select className="searchSelect" onChange={(e) => handleLangSelect(e)}>
                    <option defaultValue value="English">English</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                    <option value="Yiddish">Yiddish</option>
                </select>
                <div>
                    <button className="clearfilters" onClick={() => handleApplyClick()}>Apply</button>
                    <button className="clearfilters" onClick={() => handleClearClick()}>Clear</button>
                </div>
            </div>
        </Filterbox>
    )
}
export default Filters