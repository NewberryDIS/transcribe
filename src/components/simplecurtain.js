import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import Feature from './feature'
import SvgLogo from './logo'
import { fonts } from './styles'
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
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: var(--height);
    transition: height 0.1s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    background: url(${props => props.bg});
    .spacer {
        // flex: 1;
        height: var(--halfheight);
        transition: height 0.1s;
        overflow: hidden;
    }
    .banner {
        font-family: ${fonts.serif};
        transition: font-size 0.1s, line-height 0.1s;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        color: rgba(207,207,207,1);
        background: rgba(37,37,37,0.7);
        font-size: var(--fontsize);
        line-height: var(--fontsize);
        will-change: font-size, line-height;
        padding: 0.5vmin 1vmin;
        .left, .right {
            flex: 1;
        }
        .right {
            text-align: right;
        }
    }
    background-size: cover;
    background-position: 50% 50%;
    .nogo {
        // color: white;
        height: var(--logosize);
    }
    
`
const Curtain = props => {
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null
    // const instance = curtain != null ? basicScroll.create({
    const instance = basicScroll.create({
        elem: curtain,
        from: 0,
        to: '70vh',
        props: {
            '--height': {
                from: '70vmin',
                to: '3vmin',
            },
            '--halfheight': {
                from: '35vmin',
                to: 0
            },
            '--fontsize': {
                from: '10vmin',
                to: '2.5vmin',
            },
            // '--logosize': {
            //     from: '12vmin',
            //     to: '2vmin'
            // }   
        }
    // }) : ''
    })
    instance.start()
    let bg = bgarray[Math.round(Math.random() * 7)]
    return (
        <Curtaincss bg={bg}>
            <div className="spacer">
                <Feature />
            </div>
            <div className="banner">
                <div className="left">
                {/* <img className="nogo" src={logo} /> */}
                    Newberry Transcribe
                </div>
                <div className="right">
                    Be a part of history
                </div>
            </div>
        </Curtaincss>
    )
}
export default Curtain