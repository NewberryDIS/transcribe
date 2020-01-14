import React from 'react'
import styled from '@emotion/styled'
import bg from '../images/nbbg.jpg'
import bg1 from '../images/lgbg1.jpg'
import bg2 from '../images/lgbg2.jpg'
import bg3 from '../images/lgbg3.jpg'
import bg4 from '../images/lgbg4.jpg'
import bg5 from '../images/lgbg5.jpg'
import bg6 from '../images/lgbg6.jpg'
import bg7 from '../images/lgbg7.jpg'
import bg8 from '../images/lgbg8.jpg'
import bg9 from '../images/lgbg9.jpg'
import bg10 from '../images/lgbg10.jpg'
import bg11 from '../images/lgbg11.jpg'

const Bodycss = styled.div`
    z-index: -9990;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(${props => props.bg});
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;

`

const bgarray = [
    bg,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
]

const Background = props => {
    let bodybg = bgarray[Math.round(Math.random() * 11)]
    return (
        <Bodycss bg={bodybg} />
    )
}
export default Background