import React from 'react'
import styled from '@emotion/styled'
import SubjectFilters from './subjectfilters'
import Search from './search'

const Selectcss = styled.select`
    border: 2px solid rgba(37,37,37,0.7);
    padding: 7px 5px 5px 5px;
    margin: 10px 0;
    height: 40px;
    line-height: 30px;
    background: rgba(255,255,255,0.7);
    font-size: 16px;
`

const Languages = props => {
    const languages = ['English', 'German', 'Italian', 'Spanish', 'Yiddish']
    const langdropdown = languages.map((l) => <option key={l} value={l} >{l}</option>)
    return (
        <Selectcss name="dropdownlanguages" >
            <option >Select a language...</option>
            {langdropdown}
        </Selectcss>
    )
}


const Dates = props => {
    let range = [1660, 1990]
    let decades = []
    for (let i = range[0]; i < range[1]; i += 10){
        decades.push(<option key={i} value={i}>{i} - {i + 9}</option>)
    }
    return (
        <Selectcss name="dropdowndecade" >
            <option >Select a decade...</option>
            {decades}
        </Selectcss>
    )
}

const Progresscss = styled.div`
    border: 2px solid rgba(37,37,37,0.7);
    margin: 10px 0;
    height: 35px;
    box-shadow: inset 0 0 10px rgba(0,42,85,0.7);
    position: relative;
    display: flex;
    &:hover {
        .text {
            color: rgba(37,37,37,0.9);
        }
        .complete {
            background: rgba(0,85,170,0.3);
        }
    }
    .text {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 35px;
        font-size: 16px;
        line-height: 16px;
        padding: 2px 0;
        // margin: 0 auto;
        text-align: center;
        color: rgba(37,37,37,0.8);
        transition: color 0.3s;
    }
    .complete {
        display: block;
        background: rgba(0,85,170,0.4);
        flex-basis: ${props => props.percent}%;
        transition: background 0.5s;
    }
    transition: background 0.5s;
    transition: color 0.5s;
`
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Sidebarcss = styled.div`
    width: 20vw;
    height: 100%;
    position: sticky;
    top: 4vmin;
    color: rgba(207,207,207,1);
    .sidebarcontent {
        height: 100%;
        overflow: auto;
        width: 75%;
        margin: 25px auto;
        padding: 15px;
        display: flex;
        flex-direction: column;
        background-color: rgba(207,207,207,1);
        border: 1px solid rgba(37,37,37,1);
        color: rgba(37,37,37,1);
        justify-content: space-between;
        box-shadow: inset 0 0 8px rgba(37,37,37,1);
    }
`
const Sidebar = props => {
    function filterHandler(type, needle){
        let tempFilters = props.filters
        tempFilters[type] = needle
        props.setFilters(tempFilters)
        props.boxer()
    }
    return (
        <Sidebarcss>
            <div className="sidebarcontent">
                <Progress progress={props.progress} />
                <Search filterHandler={filterHandler} setBoxWidth={props.setBoxWidth} />
                <Dates filterHandler={filterHandler} />
                <Languages filterHandler={filterHandler} />
                <SubjectFilters filterHandler={filterHandler} />
                <Resetbutton><div className="button" onClick={() => props.setBoxWidth(true)}>Reset</div></Resetbutton>
            </div>
        </Sidebarcss>
    )
}

const Progress = props => {
    let percentComplete = Math.round(props.progress.percentComplete)
    return (
        <Progresscss percent={props.progress.percentComplete}>
            <div className="complete"></div>
            <div className="text">{numberWithCommas(props.progress.totalcomplete)} out of {numberWithCommas(props.progress.total)} pages completed!</div>
        </Progresscss>
    )
}

const Resetbutton = styled.div`
    width: 100%;
    text-align: center;
    .button {
        font-family: sans-serif;
        margin: 25px auto;
        display: inline-block;
        width: initial;
        padding: 12px 15px ;
        border: 1px solid black;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,42,85,1);
        background: rgba(125,159,193,1);
        color: rgba(37,37,37,0.8);
        transition: background 0.5s, color 0.1s;
        &:hover {
            color: rgba(37,37,37,1);
            background: rgba(143,169,195,1);
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