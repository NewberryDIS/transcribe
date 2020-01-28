import React, { useState } from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'
import Progress from './progressbar'

var Highlight = require('react-highlighter');

const Rectanglecss = styled.div`
    // sizes
    @media only screen and (min-width: 1200px){
        --width: 20vw;
        --height: 20vw;
        width: var(--width);
        height: var(--height);
        .textwrapper {
            flex-basis: var(--width);
        }
        .searchtextpanel {
            height:  var(--height);
        }
        .rectanglewrapper {
            flex-direction: row;
        }
        .leftwrapper {
            height: var(--width);
            .textwrapper {
                height: calc(var(--width) - 30px);
            }
        }
        img {
            height: var(--width);
        }
    }
    @media only screen and (max-width: 1200px){
        --width: 20vw;
        --height: 40vw;
        .textwrapper {
            flex: 1;
        }
        .rectanglewrapper {
            flex-direction: column;
        }
        .leftwrapper {
            flex: 1;
        }
        .searchtextpanel {
            max-height:  var(--height);
        }
    }
    border: 2px solid rgba(37,37,37,1);
    background: rgba(237,237,237,1);
    box-shadow: inset 0 0 10px rgba(0,42,85,0.7);
    margin: 1vw;
    position: relative;
    overflow: hidden;
    .rectanglewrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .searchtextpanel {
        flex: 1;
        padding: 10px 25px;
        overflow: auto;
        font-family: ${fonts.serif};
        line-height: 1.35rem;
        .highlight {
            background: yellow;
        }
    }
    .leftwrapper {
        display: flex;
        .textwrapper {
            flex-basis: var(--width);
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            .desc {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .progress {
                flex-basis: 40px;
                flex-shrink: 0;
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
            font-family: ${fonts.sans};
            font-size: 0.7rem;
            text-transform: uppercase;
            color: rgba(${colors.hl}, 1);
            span {
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
    img {
        flex-basis: var(--width);
        padding: 0;
        border: 0;
        z-index: 3;
        box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
        width: var(--width);
    }
`
const Textbox = props => 
    <div className={props.activePage === props.index ? 'active' : 'inactive'}>
        <p className="clickery">
            <span className={props.total > 1 ? 'leftarrow activearrow' : 'leftarrow inactivearrow'} onClick={() => props.pageSwitch('back')}>&#60;</span><span className="resultstext">Result {props.index + 1} of {props.total}</span><span className={props.total > 1 ? 'rightarrow activearrow' : 'rightarrow inactivearrow'} onClick={() => props.pageSwitch('forward')}>&#62;</span>
        </p>
        <Highlight search={props.filter}>{props.tarray[1]}</Highlight>
        <p><a href={props.tarray[0]}>Go to page</a></p>
    </div>


const SearchResults = props => {
    const [activePage, setActivePage] = useState(0)
    const pageSwitch = dir => {
        const adder = dir === 'back' ? -1 : 1
        const newPage = adder + activePage > props.tarray.length -1 ? 0 : adder + activePage < 0 ? props.tarray.length -1 : adder + activePage
        setActivePage(newPage)
    }
    const results = props.tarray.map((t, i) => <Textbox activePage={activePage} pageSwitch={pageSwitch} total={props.tarray.length} filter={props.filter} tarray={t} index={i} />)
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
    display: flex;
    flex-direction: column;
    .bottomwrapper {
        flex: 1;
        margin: 15px;
        padding: 15px;
        border: 1px solid rgba(${colors.fg}, 1);
        box-shadow: 0 0 10px rgba(0,42,85,0.5);
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
    }
    .topwrapper {
        flex-basis: var(--height);
        flex-shrink: 0;
        display: flex;
        justify-content: stretch;
        img {
            box-shadow: 0 0 10px rgba(0,42,85,0.5);
            flex-basis: var(--width);
            flex-shrink: 0;
            padding: 0;
            margin: 0;
            // box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
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
                font-family: ${fonts.sans};
                font-size: 0.7rem;
                text-transform: uppercase;
                color: rgba(${colors.hl}, 1);
                span {
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
        return <span onClick={() => props.setSubjFilter(i)}>{i}</span>
    })
    return (
    <Rectcss className="rectangle" id={props.id} href={props.link}>
        <div className="topwrapper">
            <img src={props.img} />
            <div className="textandresults">
                <div className="textwrapper">
                    <p className="category">{cats}</p>
                    <h3>{props.title.length > 100 ? props.title.substring(0,100) + '...' : props.title}</h3>
                    <p className="desc">{props.text}</p>
                    <div className="progress"><Progress progress={props.progress} /></div>
                </div>
                <div className="bottomwrapper">
                    <SearchResults tarray={props.pages} filter={props.textFilter} />

                </div>
            </div>
        </div>
    </Rectcss>
)}

export default Rectangle