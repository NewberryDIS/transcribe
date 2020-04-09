import React, { useState } from 'react'
import Background from '../components/background'
import { Global, css } from "@emotion/core"
import styled from '@emotion/styled'
import Parser from 'html-react-parser';
import { colors, fonts } from '../components/styles'
import Footer from '../components/footer'
import Topbar from '../components/topbar'
import Jumbo from '../components/jumbo'
import { Indexcss } from './index.js'


import CustomQueryStringComponent from "../components/customQueryStringComponent"

const Aboutcss = styled.div`
    width: 60%;
    background: rgba(${colors.bg});
    color: rgba(${colors.fg});
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    margin: 80px auto;
    padding: 2vw 5vw;
    font-family: ${fonts.sans};
    h1, h3 {
        font-family: ${fonts.serif};
        margin: 12px 0;
    }
    h3 {
        font-size: 1.5rem;
    }
    ul {
        li {
            padding: 5px 0;
        }
    }
}
        a {
            font-weight: 900;
            transition: color 0.2s;
            text-decoration: none;
            color: rgba(${colors.fg}, 1);
            background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s, color 0.2s;
            &:hover {
                color: rgba(${colors.fg}, 0.8);
                background-size: 100% 3px;
            }
`
const Aboutcontent = () =>{
    
    return (
        <Aboutcss>
            <h1>About Newberry Transcribe</h1>
        </Aboutcss>
    )
}



const About = () => {
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()
    return (
        <Indexcss >
        <Global styles={css`
            html, body {
                margin: 0;
                padding: 0;
                position: relative;
                z-index: 1;
            }
        `}/>
        <Topbar  />
        <Background setBgId={setBgId} setBgNo={setBgNo} />
            <Aboutcontent />
            <CustomQueryStringComponent />
            <Footer bgId={bgId} bgNo={bgNo}/>
        </Indexcss>
    )
}
export default About