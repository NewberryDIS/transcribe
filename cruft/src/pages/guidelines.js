import React, { useState } from 'react'
import { Link } from 'gatsby'
import Background from '../components/background'
import styled from '@emotion/styled'
import Parser from 'html-react-parser';
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'
import { colors, fonts } from '../components/styles'
import { Indexcss } from './index'

const Guidecss = styled.div`
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
    }
`

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });
    return await response.json(); 
}
  

const Glcontent = () =>{
    const [content, setContent] = useState('Loading...')
    const dataLink = 'https://cors-anywhere.herokuapp.com/https://publications.newberry.org/digital/mms-transcribe/guidelines.json'
    postData(dataLink).then((data) => {
        setContent(data["https://publications.newberry.org/digital/mms-transcribe/guidelines.42"]["http://rdfs.org/sioc/ns#content"]["0"].value)
    });
    return (
        <Guidecss>
            <h1>Transcription Guidelines</h1>
            {Parser(content)}
        </Guidecss>
    )
}
const Guidelines = () => {
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()
    return (
        <Indexcss >
            <Global styles={css`
                html, body {
                    margin: 0;
                    padding: 0;
                }
            `}/>
            <div className="banner">
                <div className="leftext"><Link to={'/'} >Newberry Transcribe</Link></div>
                <div className="righttext">Be a part of history</div>
            </div>
            <Background setBgId={setBgId} setBgNo={setBgNo} />
            <Glcontent />
            <Footer bgId={bgId} bgNo={bgNo}/>
        </Indexcss>
    )
}
export default Guidelines