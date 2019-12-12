import React, {useState} from 'react'
import styled from "@emotion/styled"
import { colors, Cardwrapper } from "./misc"
import Sicon from './sicon'
import DateSlider from './dateSlider'
import bg from '../images/background.jpg'

const SidebarWrapper = styled.div`
    margin: 15px;
    padding: 0;
    background-color: ${colors.bg};
    color: ${colors.fg};
    // border: 5px solid ${colors.fg};
    border: 1px solid ${colors.fg};
    border-radius: 8px;
    width: 200px;
    height: calc(100vh - 40px);
    flex-basis: 200px;
    display: inline-block;
    position: relative;
    overflow-y: auto;

`
const SidebarTop = styled.div`
    // position: sticky;
    flex-basis: 60px;
    padding: 0 5px;
    top: 0px;
    color: ${colors.fg};
    // font-family:"News Cycle", sans-serif;
    h3 {
        font-size: 1.1rem;
        line-height: 60px;
        margin: 0;
        text-transform: uppercase;
    }
    .sidebarSubtitle {
        font-size: 0.75rem;
        margin: 0;
        text-transform: uppercase;
    }
`
const SidebarBottom = styled.div`
    flex: 1;
    input {
        width: 100%;
    }
`
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            filterType: 'titleFilter',
            dates: this.props.dateFilter,
            lang: this.props.langFilter,

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
    clearSearch(e){
        console.log(this.refs.searchType.value + ' : ' + this.refs.searchInput.value)
    }
    onKeyPress = (e) => {
        if(e.which === 13) {
            this.handleSubmit(e)
        }
    }
    setDates = (e) => {
        this.setState({dates: e})
    }
    handleLangSelect = (e) => {
        this.setState({lang: e})
    }
    handleApplyClick = (e) => {
        this.props.setFilters(this.state.lang, 'langFilter')
        this.props.setFilters(this.state.dates, 'dateFilter')
    }
    handleClearClick = () => {
        this.props.setFilters('','titleFilter')
        this.props.setFilters('','textFilter')
        this.props.setFilters('','subjectFilter')
        this.props.setFilters('','langFilter')
        this.props.setFilters([1600, 2000],'dateFilter')
        this.setDates([1600,2000])
        this.setLang('English')
    }
    render() {
        return (
            <Cardwrapper className="sidebar" image={bg} sidebar={true}>
                <SidebarTop >
                    <h3>Newberry Transcribe</h3>
                </SidebarTop>
                <SidebarBottom>
                    <div>
                        <div>
                            <input ref="searchInput" onKeyPress={(e) => this.onKeyPress(e)} type="text" placeholder="Search..."/>
                            <div onClick={(e) => this.handleSubmit(e)}><Sicon /></div>
                        </div>
                        <select ref="searchType" onChange={(e) => this.handleSelect(e)}>
                            <option defaultValue value="titleFilter">Title</option>
                            <option value="textFilter">Transcription Keywords</option>
                            <option value="subjectFilter">Subjects</option>
                        </select>
                        <div>
                            <DateSlider storeDates={this.setDates} setFilters={this.props.setFilters} dates={this.state.dates} dateFilter={this.props.dateFilter} />
                        </div>
                        <select onChange={(e) => this.handleLangSelect(e)}>
                            <option defaultValue value="English">English</option>
                            <option value="German">German</option>
                            <option value="Italian">Italian</option>
                            <option value="Yiddish">Yiddish</option>
                        </select>
                        <div>
                            <button onClick={() => this.handleApplyClick()}>Apply</button>
                            <button onClick={() => this.handleClearClick()}>Clear</button>
                        </div>
                    </div>
                </SidebarBottom>
            </Cardwrapper>
        )
    }
}
