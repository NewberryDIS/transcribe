import React, { useState } from 'react'
import styled from '@emotion/styled'
import Progress from './progress'
import Search from './search'
import Subjectfilters from './subjectfilters'
import DateSlider from './dateSlider';

const Sidebarlayout = styled.div`
    font-family: 'Lato', sans-serif;
    position: fixed;
    top: 0;
    height: 100%;
    width: 20vw;
    margin: 0;
    padding: 5vh 15px;
    // overflow: auto;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    background: white;
    transition: all .25s ease-in-out;
`

const Sidebar = props => {
    const [dates, setDates] = useState([1600,1990])
    const [show, setShow] = useState(true)
    const submitSearch = (v) => {
        console.log(v);
    }
    return (
        <Sidebarlayout className={show ? 'show' : 'hide'}>
            <Progress cToggle={props.cToggle} percent={props.prog.percentComplete} compl={props.prog.totalcomplete} total={props.prog.total} />
            <Search submitSearch={submitSearch} />
            <Subjectfilters />
            <DateSlider setDates={setDates} dates={dates}/>
        </Sidebarlayout>
    )
}
export default Sidebar