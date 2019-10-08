import { Link } from "gatsby"
import React from "react"
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import {Container, Row, Flexbox, FontSizes } from './pieces'
import Hand from '../images/hand.png'

const headercss = css`
    font-family: 'News Cycle', sans-serif;
    // background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
    background: rgba(0,0,0,0.85);
    -webkit-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    color: white;
    font-family: sans-serif;
    & img {
        margin: 0; 
        flex-basis: 150px;
        max-width: 121px;
        max-height: 121px;
        width: auto;
        height: auto;
        filter: invert(1);
        @media (max-width: 900px ){
            // margin: 0 0 15px 0;
        }
    } 
    & a {
        color: white;
        text-decoration: none; background-image: linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75));
        background-position: 0% 105%;
        background-repeat: no-repeat;
        background-size: 0% 2px;
        transition: background-size .2s;
        
        &:hover {
            background-size: 100% 2px;
        }
    }
    & h1, h3, p {
        margin: 2px;
    }
    & .subheader {
        font-style: italic;
        line-height: ${FontSizes.lg};
    }
    & h1 {
        font-size: ${FontSizes.xl};
    }
    & h3 { 
        font-size: ${FontSizes.md};
    }
    & .subheader {
        font-size: ${FontSizes.lg};
    }
    & p {
        font-size: ${FontSizes.sm};
    }
    & .mainc, .otherc {
        margin: 0 15px;

    }
    .otherc {
        @media (max-width: 900px){
            display: none;
        }
    }
    .hidey {
        display: none;
        @media (max-width: 900px){
            display: block;
            font-size: ${FontSizes.md};
        }
    }
`


const Header = () => (
    <header css={headercss}>
        <Container >
                <Row >
                    <Flexbox flex={1.2}>
                        <Flexbox column className="mainc" >
                            {/* <h1>Newberry Transcribe</h1> */}
                            <p className="subheader">Uncover everyday life in the 19th &amp; early 20th centuries</p>
                            <p className="hidey">Contribute <a href="http://www.google.com">here</a>!</p>
                        </Flexbox>
                        <Flexbox column css={css`justify-content: center; align-items: center;`}>
                            <img src={Hand}  />
                        </Flexbox>
                    </Flexbox>
                    <Flexbox flex={1} column className="otherc">
                        <h3>Volunteeer online to make historic records easier to find and search</h3>
                        <p>Your efforts transcribing hadwritten letters &amp; diaries will help improve access to our shared cultural heritage.</p>
                        <p>Learn more <a href="http://www.google.com">here</a> or simply choose a collection below to get started &ndash; no account needed!</p>
                    </Flexbox>
                </Row>
        </Container>
    </header>
)

export default Header
