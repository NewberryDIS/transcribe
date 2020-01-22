import React, { useState } from 'react'
import Curtain from '../components/simplecurtain'
import Background from '../components/background'
import Boxes from '../components/simpleboxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'

const Indexcss = styled.div`
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

const Index = () => {
    //     const allContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    //     const currContent = allContent
    const currContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    const [resultCount, setResultCount] = useState(0)
    return (
        <Indexcss >
            <Global styles={css`
                html, body {
                    margin: 0;
                    padding: 0;
                }
            `}/>
            <Curtain resultCount={resultCount} />
            <Background />
            <Boxes setResultCount={setResultCount} resultCount={resultCount} currContent={currContent} progress={content['summary']}/>
            <Footer />
        </Indexcss>
    )
}
export default Index