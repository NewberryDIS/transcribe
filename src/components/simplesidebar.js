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
    const langdropdown = languages.map((l) => <option value={l} >{l}</option>)
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
        decades.push(<option value={i}>{i} - {i + 9}</option>)
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
    height: 40px;
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
        line-height: 40px;
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
    let percentComplete = Math.round(props.progress.percentComplete)
    return (
        <Sidebarcss>
            <div className="sidebarcontent">
                <Progress progress={props.progress} />
                <Search />
                <Dates />
                <Languages />
                <SubjectFilters />
            </div>
        </Sidebarcss>
    )
}

const Progress = props => {
    let percentComplete = Math.round(props.progress.percentComplete)
    return (
        <Progresscss percent={percentComplete}>
            <div className="complete"></div>
            <div className="text">{numberWithCommas(props.progress.totalcomplete)} out of {numberWithCommas(props.progress.total)} pages completed!</div>
        </Progresscss>
    )
}

export default Sidebar