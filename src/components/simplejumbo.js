import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import Feature from './feature'
import SvgLogo from './logo'
import { colors, fonts } from './styles'
import logo from '../images/drawing.svg'

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
        line-height: calc(var(--fontsize) + 1.5vh);
        height: calc(var(--fontsize) + 2vh);
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
    return (
        <Curtaincss className="element" >
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