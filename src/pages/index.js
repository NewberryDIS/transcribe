import React from 'react'
import Curtain from '../components/curtaintwo'
import Sidebar from '../components/sidebar'
import Boxes from '../components/boxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import bg1 from '../images/lgbg1.jpg'
import bg2 from '../images/lgbg2.jpg'
import bg3 from '../images/lgbg3.jpg'
import bg4 from '../images/lgbg4.jpg'
import bg5 from '../images/lgbg5.jpg'
import bg6 from '../images/lgbg6.jpg'
import bg7 from '../images/lgbg7.jpg'

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
        const currContent = allContent.slice(0,202)
        return (
            <Indexcss>
                <Global styles={css`
                    html, body {
                        margin: 0;
                        padding: 0;
                        // background: url(${bg1});
                        // box-shadow: inset 0 0 0 5000px rgba(0,100,255,0.3);
                        // background-attachment: fixed;
                        // background-size: cover;
                    }
                `}/>
                <Curtain />
                <Sidebar />
                <Boxes currContent={currContent} />
            </Indexcss>
        )
    }
}