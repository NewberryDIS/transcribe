import React from 'react'
import Curtain from '../components/simplecurtain'
import Background from '../components/background'
import Boxes from '../components/boxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'

const Indexcss = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 1;
`
//300,100,2000,2500/1000,/
const content = require('../data/content.json')

export default class Index extends React.Component {
    render(){
        const allContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
        const currContent = allContent.slice(0,18)
        return (
            <Indexcss >
                <Global styles={css`
                    html, body {
                        margin: 0;
                        padding: 0;
                    }
                `}/>
                <Curtain />
                <Background />
                <Boxes currContent={currContent} progress={content['summary']}/>
                <Footer />
            </Indexcss>
        )
    }
}