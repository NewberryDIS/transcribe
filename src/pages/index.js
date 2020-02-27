import React, { useState } from 'react'
import Jumbo from '../components/jumbo'
import Background from '../components/background'
import Boxes from '../components/simpleboxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'
import Topbar from '../components/topbar'

export const Indexcss = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
`
//300,100,2000,2500/1000,/
const content = require('../data/content.json')

const Index = props => {
    const { search } = props.location
    const date = search.substr(search.indexOf('=') + 1 )
    console.log(date)
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()
    const allContent = content['items'].sort((a,b) => (a.percentTranscribed > b.percentTranscribed) ? 1 : -1)
    const [resultCount, setResultCount] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)
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
            <Topbar setShowDropdown={setShowDropdown} showDropdown={showDropdown} resultCount={resultCount} />
            <Jumbo />
            <Background setBgId={setBgId} setBgNo={setBgNo} />
            <Boxes showDropdown={showDropdown} setResultCount={setResultCount} resultCount={resultCount} allContent={allContent} progress={content['summary']}/>
            <Footer bgId={bgId} bgNo={bgNo}/>
        </Indexcss>
    )
}
export default Index