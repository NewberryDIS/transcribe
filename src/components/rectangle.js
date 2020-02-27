import React, { useState } from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'
import Progress from './progressbar'

import Highlighter from "react-highlight-words"

const Textbox = props => {
    props.setBgimage(props.tarray[2])
    return (
    <div className={props.activePage === props.index ? 'active' : 'inactive'}>
        <p className="clickery">
            <button className={props.total > 1 ? 'leftarrow activearrow' : 'leftarrow inactivearrow'} onClick={() => props.pageSwitch('back')}>&#60;</button><span className="resultstext">Result {props.index + 1} of {props.total}</span><button className={props.total > 1 ? 'rightarrow activearrow' : 'rightarrow inactivearrow'} onClick={() => props.pageSwitch('forward')}>&#62;</button>
        </p>
        <pre><Highlighter
            highlightClassName="hilite"
            searchWords={props.filter}
            textToHighlight={props.tarray[1]}
            /></pre>
        <p><a href={'https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/' + props.id + '/' + props.tarray[0]}>Go to page</a></p>
    </div>
)}


const SearchResults = props => {
    const [activePage, setActivePage] = useState(0)
    const pageSwitch = dir => {
        const adder = dir === 'back' ? -1 : 1
        const newPage = adder + activePage > props.tarray.length - 1 ? 0 : adder + activePage < 0 ? props.tarray.length - 1 : adder + activePage
        setActivePage(newPage)
    }
    const results = props.tarray.map((t, i) => <Textbox setBgimage={props.setBgimage} id={props.id} activePage={activePage} pageSwitch={pageSwitch} total={props.tarray.length} filter={props.filter} tarray={t} index={i} />)
    return (
        <div className="searchtextpanel">
            {results}
        </div>
    )
}

const Rectcss = styled.div`
    --width: 20vw;
    --height: 20vw;
    width: 80%;
    margin: 10px auto;
    background: rgba(${colors.bg}, 1);
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    display: flex;
    flex-direction: column;
    .hilite {
        background: rgba(255, 255, 126, 0.75);
    }
    pre {
        margin: 0px 10px;
        font-family: ${fonts.serif};
            white-space: pre-wrap;       /* css-3 */
            white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
            white-space: -pre-wrap;      /* Opera 4-6 */
            white-space: -o-pre-wrap;    /* Opera 7 */
            word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }
    .textbox {
        margin: 0px 10px;
        pre {

            white-space: pre-wrap;       /* css-3 */
            white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
            white-space: -pre-wrap;      /* Opera 4-6 */
            white-space: -o-pre-wrap;    /* Opera 7 */
            word-wrap: break-word;       /* Internet Explorer 5.5+ */
        }
    }
    .bottomwrapper {
        flex: 1;
        margin: 15px;
        padding: 15px;
        border: 1px solid rgba(${colors.fg}, 1);
        box-shadow: 0 0 10px rgba(0,42,85,0.5);
        box-shadow: inset 0 0 8px rgba(${colors.fg},1);
        // width: 100%;
        .clickery {
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .leftarrow, .rightarrow {
            font-size: 24px;
            // display: block;
            // flex: 1;
            text-align: center;
            padding: 4px 10px;
            margin: 0 15px;
            transition: all 0.2s;
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

        padding: 10px;
        // margin: 30px;
        // border-radius: 6px;
        // background: #d0d0d0;
        // box-shadow: 10px 10px 60px rgba(${colors.fg},0.5)
    }

    .topwrapper {
        @media only screen and (max-width: 1000px){
            flex-direction: column;
        } 
        flex-basis: var(--height);
        flex-shrink: 0;
        display: flex;
        justify-content: stretch;
        img {
            box-shadow: 0 0 10px rgba(0,42,85,0.5);
            flex-basis: var(--width);
            flex-shrink: 0;
            padding: 0;
            margin: 15px;
            background-image: url(${props => props.image});
            background-size: cover;
            background-position: center;
            // box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
            // from footer tweets
                padding: 10px;
                margin: 30px;
                border-radius: 6px;
                // background: #d0d0d0;
                box-shadow: 10px 10px 60px rgba(${colors.fg},0.5);
                border: 1px solid rgba(${colors.fg}, 1);
        }
        .textwrapper { 
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 15px;
            .desc {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h3 {
                line-height: 22px;
                padding: 0;
                margin: 10px 0;
                font-size: 22px;
                font-family: ${fonts.serif};
            }
            p {
                margin: 0;
                font-family: ${fonts.sans};
            }
            .category {
                button {
                    background: rgba(0,0,0,0);
                    border: 0;
                    font-family: ${fonts.sans};
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: rgba(${colors.hl}, 1);
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
        }
    }
`


const Rectangle = props => {
    const cats = props.category.split(';').map((i) => {
        i = i.trim()
        return <button onClick={() => props.setSubjFilter(i)}>{i}</button>
    })
    const title = props.title.length > 100 ? props.title.substring(0,100) + '...' : props.title
    const [ bgimage, setBgimage ] = useState(props.img)
    return (
    <Rectcss className="rectangle" id={props.id} href={props.link} image={bgimage} >
        <div className="topwrapper">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="cover of resource"/>
            <div className="textandresults">
                <div className="textwrapper">
                    <p className="category">{cats}</p>
                    <h3>
                        <Highlighter
                            highlightClassName="hilite"
                            searchWords={props.textFilter}
                            textToHighlight={title}
                        />
                    </h3>
                    <p className="desc">{props.text}</p>
                    <div className="progress"><Progress progress={props.progress} /></div>
                </div>
                <div className="bottomwrapper">
                    <SearchResults id={props.id} tarray={props.pages} filter={props.textFilter} setBgimage={setBgimage} />

                </div>
            </div>
        </div>
    </Rectcss>
)}

export default Rectangle