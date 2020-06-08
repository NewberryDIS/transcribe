import React from 'react'
import { useFetch } from './hooks'
import styled from '@emotion/styled'
import { fonts, colors } from './csscomponents'
// import { summary } from '/data/summary'

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
        // height: 26px;
        font-size: 20px;
        line-height: 32px;
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

export const ItemProgress = ({itemid, pageCount }) => {
    const itemdataurl = '/transcription/mms-transcribe/api/files?item=' + itemid
    const [data, loading] = useFetch(itemdataurl, false)
    let transCount = 0
    const percentage = data.map(i => {
        if (i.element_texts[1] === undefined ){
            // console.log('element texts 1 is undefined')
        } else {
        if (i.element_texts[1].element.name = 'Transcription'){
            if (i.element_texts[1].text.length > 0){
                transCount++
            } else {
                // console.log('transcription length 0') 
        }} else {
            console.log('second element text not a transcription')
        }
    }})
    const percent = Math.round((transCount / pageCount) * 100 )
    return (
        <Progresscss 
            percent={percent}>
            <div className="complete"></div>
            <div className="text">{percent}% transcribed</div>
        </Progresscss>
    )
}

export const PageProgress = ({prog}) => {
    const percent = prog ? 100 : 0
    return (
    <Progresscss percent={percent}>
            {prog ? 
                <div className="complete text">In Progress / Needs Review</div>
            :    
                <div className="text">Not transcribed</div>
        }
    </Progresscss>
)}

export function TotalProgress() {
    const summaryUrl = '/transcribe/data/summary.json'
    const [ data, loading ] = useFetch(summaryUrl)
    return (
        <>{ loading ? 'Loading...' : <>
            <div className="progress-text" >{numberWithCommas(data.summary.totalTranscount)} out of {numberWithCommas(data.summary.totalPages)} pages transcribed!</div>
            <Progresscss percent={Math.round((data.summary.totalTranscount / data.summary.totalPages) * 100)}>
                <div className="complete"></div>
                <div className="text">{Math.round((data.summary.totalTranscount / data.summary.totalPages) * 100)}% transcribed</div>
            </Progresscss>
        </>
        }
        </>
    )
}