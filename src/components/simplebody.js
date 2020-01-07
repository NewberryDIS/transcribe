import React from 'react'
import Sidebar from '../components/simplesidebar'
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

const Bodycss = styled.div`
    background: url(${props => props.bg});
    background-attachment: fixed;
    background-size: cover;
    overflow-x: hidden;
    overflow-y: auto;
    overflow: auto;
    top: 3.5vmin;

`

const bgarray = [
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
]

const Body = props => {
    let bodybg = bgarray[Math.round(Math.random() * 6)]
    return (
        <Bodycss>
            <Sidebar />
            <Boxes currContent={props.currContent} />
        </Bodycss>
    )
}
export default Body