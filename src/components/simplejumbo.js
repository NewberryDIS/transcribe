import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import Feature from './feature'
import SvgLogo from './logo'
import { colors, fonts } from './styles'
import logo from '../images/drawing.svg'
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
const Curtaincss = styled.div`
    // display: flex;
    z-index: 1000;
    flex-direction: column;
    position: fixed;
    height: var(--height);
    will-change: height;
    width: 100%;
    overflow: hidden;
    .featurecontainer {
        height: var(--feight);
    }
    .bottom {
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        font-size: var(--fontsize);
        line-height: calc(var(--fontsize) + 1vh);
        height: calc(var(--fontsize) + 1vh);
        will-change: font-size, line-height;
        display: flex;
        justify-content: space-between;
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},1);
        // background: rgba(${colors.bg},0.8);
        font-family: ${fonts.serif};
    }

`

const Curtain = props => {
    // const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null
    const curtain = document.querySelector('.curtain') 
    // const instance = curtain != null ? basicScroll.create({
    const instance = basicScroll.create({
        from: '20vh',
        to: '70vh',
        props: {
            '--height': {
                from: '50vh',
                to: '4vh',
            },
            '--feight': {
                from: '37vh',
                to: '0',
            },
            '--fontsize': {
                from: '10vh',
                to: '2.5vh',
            },
        }
    // }) : ''
    })
    instance.start()
    let bg = bgarray[Math.round(Math.random() * 7)]
    return (
        <Curtaincss className="element" bg={bg}>
            <div className="featurecontainer">
                <Feature />
            </div>
            <div className="bottom">
                <div className="leftext">Newberry Transcribe</div>
                <div className="righttext">Be a part of history</div>
            </div>
        </Curtaincss>
    )
}
export default Curtain