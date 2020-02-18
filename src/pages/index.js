import React, { useState } from 'react'
// import Curtain from '../components/curtain'
// import Curtain from '../components/simplejumbo'
import Jumbo from '../components/jumbo'
import Background from '../components/background'
import Boxes from '../components/simpleboxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'
import { colors, fonts } from '../components/styles'

export const Indexcss = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .banner {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        font-size: 1.75rem;
        line-height: 2rem;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        color: rgba(${colors.fg},1);
        // background: rgba(${colors.bg},1);
        background: rgba(${colors.bg},0.8);
        font-family: ${fonts.serif};
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
//300,100,2000,2500/1000,/
const content = require('../data/content.json')

const Index = () => {
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()
    //     const allContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    //     const currContent = allContent
    const currContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    const [resultCount, setResultCount] = useState(0)
    let totalPages = content['items'].map(i => i.count).reduce((a,b) => a + b, 0)
    let totalTranscribed = content['items'].map(i => i.transcount).reduce((a,b) => a + b, 0)
    // let totalTranscribed
    // const totalProgress = content['items'].map(i => {
    //     totalProgress.totalPages = totalProgress.totalPages + i.count
    //     totalProgress.totalTranscribed = totalProgress.totalTranscribed + i.transcount
    // })

    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <Indexcss >
            <Global styles={css`
                html, body {
                    margin: 0;
                    padding: 0;
                }
            `}/>
            <Jumbo setShowDropdown={setShowDropdown} showDropdown={showDropdown} resultCount={resultCount} />
            <Background setBgId={setBgId} setBgNo={setBgNo} />
            <Boxes showDropdown={showDropdown} setResultCount={setResultCount} resultCount={resultCount} currContent={currContent} progress={content['summary']}/>
            <Footer bgId={bgId} bgNo={bgNo}/>
        </Indexcss>
    )
}
export default Index