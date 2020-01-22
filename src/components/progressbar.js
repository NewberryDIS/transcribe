import React from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'

const Progresscss = styled.div`
    border: 2px solid rgba(${colors.fg},0.7);
    margin: 10px 0;
    height: 35px; 
    background: rgba(${colors.bg},0.7);
    box-shadow: inset 0 0 10px rgba(0,42,85,0.7);
    position: relative;
    display: flex;
    &:hover {
        .text {
            // color: rgba(${colors.fg},0.9);
            color: black;
        }
        .complete {
            background: rgba(${colors.hl},0.65);
        }
    }
    .text {
        font-family: ${fonts.serif};
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 35px;
        font-size: 16px;
        line-height: 35px;
        // padding: 2px 0;
        // margin: 0 auto;
        text-align: center;
        color: rgba(${colors.fg},0.8);
        transition: color 0.3s;
    }
    .complete {
        display: block;
        background: rgba(${colors.hl},0.4);
        flex-basis: ${props => props.percent}%;
        transition: background 0.5s;
    }
    transition: background 0.5s;
    transition: color 0.5s;
`
function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Progress = props => {
    return (
        <Progresscss title={numberWithCommas(props.progress.totalcomplete) + ' out of ' + numberWithCommas(props.progress.total) + ' pages completed!'} percent={props.progress.percentComplete}>
            <div className="complete"></div>
            <div className="text">{props.progress.percentComplete}% completed!</div>
        </Progresscss>
    )
}

export default Progress