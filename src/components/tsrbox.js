import React, { useState } from 'react'
import styled from '@emotion/styled'
import Highlighter from 'react-highlight-words'
import { fonts, colors } from './styles'
import { Progressbox } from './progressbar'

const Tsrcss = styled.div`
    @media only screen and (max-width: 3500px){
        --width: 20vw;
        --height: 20vw;
    }
    @media only screen and (max-width: 1500px){
        --width: 30vw;
        --height: 30vw;
    }
    @media only screen and (max-width: 750px){
        --width:  40vw;
        --height: auto;
    }
    width: var(--width);
    margin: 20px auto ;
    background: rgba(${colors.bg},1);
    border: 2px solid rgba(${colors.fg},1);
    display: flex;
    flex-direction: column;
    img {
        max-width: var(--width);
        height: var(--height);
        flex-basis: var(--height);
        overflow: hidden;
        background: url(${props => props.bgImage});
            background-size: cover;
            background-position: center;
    }
    .textbox {
    display: flex;
    flex-direction: column;
        flex: 1;
        padding: 7px 15px;
        background: rgba(${colors.bg},1);
        border: 1px solid rgba(${colors.fg},1);
        box-shadow: inset 0 0 8px rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
    }
    .category {
        button {
            font-family: ${fonts.sans};
            font-size: 0.7rem;
            text-transform: uppercase;
            background: rgba(0,0,0,0);
            border: 0;
            color: rgba(${colors.hl}, 1);
            text-decoration: none;
            cursor: pointer;
            margin: 0;
            padding: 0 5px;
            border-right: 1px solid rgba(${colors.hl}, 0.8);

            background-image: linear-gradient(transparent 1px, rgba(${colors.hl}, 0.8) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s;

            &:hover {
                // border-bottom: 1px solid rgba(${colors.hl}, 1);
                background-size: 100% 3px;
            }
            &:last-of-type {
                border-right: 0;
            }
            &:first-of-type {
                padding: 0 5px 0 0;
            }
        }
    }
    .progress {
        padding-bottom: 10px;
        flex-basis: 40px;
        flex-shrink: 0;
    }
    .titlerow {
        font-family: ${fonts.serif};
        flex: 1;
        display: flex;
            padding: 6px 0;
        .titlebox {
            vertical-align: middle;
            flex: 1;
        }
        .percent {
            flex-shrink: 0;
        }
        a {
            color: rgba(${colors.fg}, 1);
            text-decoration: none;
            .titletext {
            background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 0.8) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s;

            &:hover {
                // border-bottom: 1px solid rgba(${colors.hl}, 1);
                background-size: 100% 3px;
            }
                font-weight: 900;
                font-size: 1.25rem;
             }
        }
    }
    .active {
        display: block;
        span {
            overflow-wrap: break-word;
            word-wrap: break-word;
            -ms-word-break: break-all;
            word-break: break-word;
            -ms-hyphens: auto;
            -moz-hyphens: auto;
            -webkit-hyphens: auto;
            hyphens: auto;
        }
    }
    .inactive {
        display: none;
    }
    .resultstext {
        line-height: 36px;
        display: block;
        text-align: center;
        flex-shrink: 0;
    }
    .searchtextpanel {
        padding: 5px 15px;
        background: rgba(${colors.bg},1);
        border: 1px solid rgba(${colors.fg},1);
        box-shadow: 0 0 8px rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
        margin: 5px 0;
        height: 150px;
        overflow: auto;
        .topwrapper {
            width: 100%;
            height: 35px;
            display: flex;
            justify-items: center;
            flex-direction: row;

            div {
                flex: 1;
                text-align: center;
            }
            p {
                margin: 0;
                line-height: 30px;
            }
            button {
                height: 30px;
                width: 30px;
                transition: all 0.2s;
            }
        }
        .activearrow {
            color: rgba(${colors.fg}, 1);
            border: 1px solid rgba(${colors.fg}, 1);
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0,42,85,0.2);
            &:hover {
                box-shadow: 0 0 10px rgba(0,42,85,0.5);
            }
        }
        .inactivearrow {
            color: rgba(${colors.fg}, 0.5);
            border: 1px solid rgba(${colors.fg}, 0.5);
            cursor: not-allowed;
            box-shadow: inset 0 0 10px rgba(0,42,85,0.2);
            &:hover {
                box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
            }
        }
    }
`

const Textbox = props => {
    return (
    <div className={props.activePage === props.index ? 'active' : 'inactive'}>
        <p className="topwrapper">
            <div><button className={props.total > 1 ? 'leftarrow activearrow' : 'leftarrow inactivearrow'} onClick={() => props.pageSwitch('back')}>&#60;</button></div>
            <div><p className="resultstext">Result {props.index + 1} of {props.total}</p></div>
            <div><button className={props.total > 1 ? 'rightarrow activearrow' : 'rightarrow inactivearrow'} onClick={() => props.pageSwitch('forward')}>&#62;</button></div>
        </p>
        <Highlighter
            highlightClassName="hilite"
            searchWords={props.filter}
            textToHighlight={props.searchresult.transcription}
        />
        <p><a href={'https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/' + props.id + '/' + props.searchresult.pageid}>Go to page</a></p>
    </div>
)}
const ResultsPages = props => {
    const [activePage, setActivePage] = useState(0)
    const pageSwitch = dir => {
        const adder = dir === 'back' ? -1 : 1
        const newPage = adder + activePage > props.searchresults.length - 1 ? 0 : adder + activePage < 0 ? props.searchresults.length - 1 : adder + activePage
        setActivePage(newPage)
        props.setBgImage('https://publications.newberry.org/transcription/mms-transcribe/files/original/' + props.searchresults[newPage].pagefilename)
    }
    const results = props.searchresults.map((t, i) => {
            if (t.transcription.length > 0) {
                return <Textbox key={props.id + '-' + i} setBgImage={props.setBgImage} id={props.id} activePage={activePage} pageSwitch={pageSwitch} total={props.searchresults.length} filter={props.filter} searchresult={t} index={i} />
            } else {
                return true
            }
        })
    return (
        <div className="searchtextpanel">
            {results}
        </div>
    )
}

const Tsrbox = props => {
    const [ bgImage, setBgImage ] = useState(props.img)
    // console.log(props.id + ': ' + props.progress.percentTranscribed)
    return(
        <Tsrcss bgImage={bgImage}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt=""/>
                <div className="textbox">
                        <div className="titlerow">
                            <a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + props.id}><Highlighter
                                className="titletext"
                                highlightClassName="hilite"
                                searchWords={props.textFilter}
                                textToHighlight={props.title}
                            /></a>
                            <div className="percent">
                                <Progressbox progress={props.progress}/>
                            </div>
                        </div>
                        <ResultsPages  id={props.id} searchresults={props.searchresults} filter={props.textFilter} setBgImage={setBgImage} />
                </div>
        </Tsrcss>
    )
}

export default Tsrbox