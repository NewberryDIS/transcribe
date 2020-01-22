import React from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'
import Progress from './progressbar';

var Highlight = require('react-highlighter');

const Boxcss = styled.a`
    // sizes
    @media only screen and (min-width: 1200px){
        --width: 20vw;
        --height: 20vw;
        &:hover {
            img {
                top: calc((var(--width) * 0.75) * -1);
            }
        }
        .textbox {
            padding: 15px;
            padding-top: calc(var(--height) * 0.25);
        }
    }
    @media only screen and (max-width: 1200px){
        --width: 35vw;
        --height: 35vw;
        &:hover {
            img {
                top: calc((var(--width) * 0.75) * -1);
            }
        }
        .textbox {
            padding: 15px;
            padding-top: calc(var(--height) * 0.25);
        }
    }
    @media only screen and (max-width: 700px){
        --width:  45vw;
        --height: 90vw;
        &:hover {
            img {
                top: 0;
            }
        }
        .textbox {
            padding: 15px;
            padding-top: calc(var(--height) * 0.5);
        }
    }
    border: 2px solid rgba(37,37,37,1);
    background: rgba(237,237,237,1);
    box-shadow: inset 0 0 10px rgba(0,42,85,0.7);
    .highlight {
        background: yellow;
    }

    display: block;
    margin: 1vw;
    flex-basis: var(--width);
    height: var(--height);
    position: relative;
    overflow: hidden;
    .textbox {
        height: calc(var(--height) * 0.75);
        display: flex;
        flex-direction: column;
        // align-content: stretch;
        // justify-content: stretch;
    }
    h3 {
        line-height: 22px;
        padding: 0;
        margin: 0;
        font-size: 22px;
        font-family: ${fonts.serif};
    }
    p {
        font-family: ${fonts.sans};
    }
    img {
        transition: top 0.2s;
        top: 0;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: 0;
        z-index: 3;
        position: absolute;
        box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
        width: var(--width);
        height: var(--width);
    }

    .category {
        font-family: ${fonts.sans};
        font-size: 0.7rem;
        text-transform: uppercase;
        color: rgba(${colors.hl}, 1);
        span {
            margin: 0;
            padding: 0 5px;
            border-right: 1px solid rgba(${colors.hl}, 1);
            &:last-of-type {
                border-right: 0;
            }
            &:first-of-type {
                padding: 0 5px 0 0;
            }
        }
    }
    .textwrapper {
        flex: 1;
    }
    .progress {
        flex-basis: 40px;
        flex-shrink: 0;
    }
`
const Box = props => {
    const cats = props.category.split(';').map((i) => {
        return <span>{i.trim()}</span>
    })
    return (
    <Boxcss className="box" id={props.id} href={props.link}>
        <div className="textbox">
            <div className="textwrapper">
                <p className="category">{cats}</p>
                <h3>{props.title.length > 100 ? props.title.substring(0,100) + '...' : props.title}</h3>
                <p>{props.text.length > 150 ? props.text.substring(0,150) + '...' : props.text}</p>
            </div>
            <div className="progress"><Progress progress={props.progress} /></div>
        </div>
        {/* <div className="searchtextpanel" ><Highlight search={props.textFilter}>{props.script}</Highlight></div> */}
        <img src={props.img} />
    </Boxcss>
)}

export default Box