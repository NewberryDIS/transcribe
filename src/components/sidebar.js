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
    width: ${props => props.widthCount}vw;
    margin: 0;
    padding: 5vh 15px;
    overflow: auto;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    background: white;
    transition: all .25s ease-in-out;
    ::-webkit-scrollbar {
        width: 10px;
      }
      
      /* Track */
      ::-webkit-scrollbar-track {
        background: #eee; 
      }
       
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #888; 
      }
      
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555; 
      }
`

const Sidebar = props => {
    const [dates, setDates] = useState([1600,1990])
    const [show, setShow] = useState(true)
    const submitSearch = (v) => {
        console.log(v);
    }
    return (
        <Sidebarlayout widthCount={props.widthCount} className={show ? 'show' : 'hide'}>
            <Progress percent={props.prog.percentComplete} compl={props.prog.totalcomplete} total={props.prog.total} />
            <Search width={props.widthCount} submitSearch={submitSearch} />
            <Subjectfilters />
            <DateSlider setDates={setDates} dates={dates}/>
        </Sidebarlayout>
    )
}
export default Sidebar