import React from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'
import Progress from './progressbar';
import { Link } from 'gatsby';

const Boxcss = styled.div`
    // sizes
    @media only screen and (max-width: 3500px){
        --width: 20vw;
        --height: 20vw;
        height: var(--height);
        &:hover {
            img {
                top: calc((var(--width) * 0.75) * -1);
            }
        }
        .textbox {
            // height: calc(var(--height) * 0.75);
            padding: 15px;
            padding-top: calc(var(--height) * 0.25);
        }
    }
    @media only screen and (max-width: 1500px){
        --width: 30vw;
        --height: 30vw;
        height: var(--height);
        &:hover {
            img {
                top: calc((var(--width) * 0.75) * -1);
            }
        }
        .textbox {
            // height: calc(var(--height) * 0.75);
            padding: 15px;
            padding-top: calc(var(--height) * 0.25);
        }
    }
    @media only screen and (max-width: 1200px){
        --width:  25vw;
        --height: auto;
        --semiheight: 33vw;
        &:hover {
            img {
                top: 0;
            }
        }
        .textbox {
            padding: 15px;
            padding-top: var(--width);
        }
        .text-wrapper {
            max-height: 100%;
        }
    }
    @media only screen and (max-width: 700px){
        --width:  45vw;
        --height: auto;
        --semiheight: 33vw;
        &:hover {
            img {
                top: 0;
            }
        }
        .textbox {
            padding: 15px;
            padding-top: var(--width);
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
    position: relative;
    overflow: hidden;
    .textbox {
        display: flex;
        flex-direction: column;
        align-content: stretch;
        height: calc(100% - var(--width));
        justify-content: stretch;
    }
    h3 {
        line-height: 25px;
        padding: 0;
        margin: 0;
        font-size: 22px;
        font-family: ${fonts.serif};
        a {
            transition: color 0.2s;
            text-decoration: none;
            color: rgba(${colors.fg}, 0.8);
            background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s, color 0.2s;

            &:hover {
                color: rgba(${colors.fg}, 1);
                background-size: 100% 3px;
            }
        }
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
    .desc {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
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
    .textwrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .progress {
        flex-basis: 40px;
        flex-shrink: 0;
    }
`
const Box = props => {
    const cats = props.category.split(';').map((i) => {
        i = i.trim()
        i = i === 'American Civil War (1861-1865)' ? 'Civil War' : i === 'Letters (Correspondence)' ? 'Letters' : i === 'Records (Documents)' ? 'Records' : i
        return <span onClick={() => props.setSubjFilter(i)}>{i}</span>
    })
    const title = props.title.length > 100 ? props.title.substring(0,100) + '...' : props.title
    return (
    <Boxcss className="box" id={props.id} href={props.link}>
        <div className="textbox">
            <div className="textwrapper">
                <p className="category">{cats}</p>
                <h3><Link to={props.id} >{title}</Link></h3>
                <p className="desc">{props.text}</p>
            </div>
            <div className="progress"><Progress progress={props.progress} /></div>
        </div>
        <img alt="Sample from Collection" title={title} src={props.img} />
    </Boxcss>
)}

export default Box