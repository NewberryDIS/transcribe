import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Boxwrapper = styled.div`
    &.mini {
        width: 9vw;
        h3 {
            font-size: 0.8rem;
        }
        img {
            height: 10vw;
        }
        .boxFooter {
            height: 9.5vw; 
            * {
                margin: 0;
                padding: 3px;
            }
        }
    }
    &.maxi {
        width: 20vw;
        h3 {
            font-size: 1rem;
        }
        img {
            height: 20vw;
        }
        .boxFooter {
            height: 8vw; 
            * {
                margin: 0;
                padding: 0px 10px;
            }
        }
        &:hover {
            img {
                top: -9vw;
            }
        }
    }
    height: 20vw;
    position: relative;
    overflow: hidden;
    margin: 1vw;
    border: 1px solid #333;
    border-top: 1px solid black;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    background: white;
    font-family: 'Lato', sans-serif;
    img {
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        z-index: 3;
        position: absolute;
        box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
    }
    .boxFooter {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
    }
`
const Box = props => (
    <Boxwrapper className={props.className}>
        <div className="boxFooter">
            <div><h3>{props.title}</h3></div>
            <div><span>{props.text}</span></div>
            <div><span>{props.prog}</span></div>
        </div>
        <img src={props.image} />
    </Boxwrapper>
)

export default Box