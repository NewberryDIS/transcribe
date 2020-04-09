import React from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './csscomponents'

const Progresscss = styled.div`
    border: 2px solid rgba(${colors.fg},0.7);
    margin: 4px 0 8px 0;
    height: 32px;
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
        height: 26px;
        font-size: 16px;
        line-height: 26px;
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
export function numberWithCommas(x) {
    x = Math.round(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Progress = props => {
    const count = props.progressData.totalPages ? props.progressData.totalPages : props.progressData.count
    const transcount = props.progressData.totalTranscount ? props.progressData.totalTranscount : props.progressData.transcount
    const percent = Math.round(props.progressData.percentTranscribed,0)
    return (
        <Progresscss 
            title={numberWithCommas(transcount) + ' out of ' + numberWithCommas(count) + ' pages transcribed!'} 
            percent={percent}>
            <div className="complete"></div>
            <div className="text">{percent}% transcribed</div>
        </Progresscss>
    )
}

const Proboxcss = styled.div`
    p {
        margin: 0;
    }
    .percent {
        text-align: center;
        font-size: 30px;
        line-height: 28px;
    }
    .bottomtext {
        font-size: 12px;
        line-height: 8px;
    }
`

export const Progressbox = props => {
    const percent = Math.round(props.progressData.percentTranscribed,0)
    return (
        <Proboxcss>
            <p className="percent">{percent}%</p>
            <p className="bottomtext">transcribed!</p>
        </Proboxcss>
    )
}
const Simpleprogcss = styled.div`
    border: 2px solid rgba(${colors.fg},0.7);
    margin: 4px 0;
    height: 26px; 
    line-height: 26px;
    text-align: center;
    background: ${props => props.complstatus ? `rgba(${colors.hl},0.4);` : `rgba(${colors.bg},0.7)`};
    box-shadow: inset 0 0 10px rgba(0,42,85,0.7);
    position: relative;
    transition: 0.1s;
    &:hover {
        color: black;
        background: ${props => props.complstatus ? `rgba(${colors.hl},0.2);` : `rgba(${colors.bg},0.5)`};
    }
`
export const Simpleprogress = props  => {
    const complstatus = props.status ? "Complete!" : "Not transcribed"
    return (
        <Simpleprogcss complstatus={props.status}>{complstatus}</Simpleprogcss>
    )
}

export default Progress