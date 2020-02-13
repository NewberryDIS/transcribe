import React from 'react'
import { css } from '@emotion/core'
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
    // overflow: hidden;
    .featurecontainer {
        height: var(--feight);
    }
    .bottom {
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        font-size: var(--fontsize);
        line-height: calc(var(--fontsize) + 1.5vh);
        // height: var(--textheight);
        will-change: font-size, line-height, height;
        display: flex;
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},1);
        font-family: ${fonts.serif};
        overflow: hidden;
    }
    .rightext {
        text-align: right;
    }
    @media only screen 
        and (max-width : 750px) { 
            .rightext {
                display: none;
            }
            #hamburger {
                line-height: 2.5vh;
                vertical-align: bottom;
                display: inline-block;
                cursor: pointer;
                padding: 3px 5px;
                .bar1, .bar2, .bar3 {
                    box-shadow: 0 0 10px rgba(${colors.fg},1);
                    width: 3vh;
                    height: 4px;
                    background-color: rgba(${colors.fg},1);
                    margin: 5px 0;
                    transition: 0.2s;
                }
                &.change .bar1 {
                    -webkit-transform: rotate(-45deg) translate(-7px, 6px);
                    transform: rotate(-45deg) translate(-7px, 6px);
                }
                
                &.change .bar2 {opacity: 0;}
                
                &.change .bar3 {
                    -webkit-transform: rotate(45deg) translate(-6px, -6px);
                    transform: rotate(45deg) translate(-6px, -6px);
                }
            }
    }
    @media only screen 
        and (min-width : 750px) { 
            .bottom {
                justify-content: space-evenly;
            }
            .rightext, .leftext {
                width: 400px;
            }
            #hamburger {
                display: none;
            }
    }
    .leftextext {
        display: inline-block;
        flex:1;
    }
    .leftext {
        display: flex;
        // box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    }
    .leftextel img {
        vertical-align: bottom;
        line-height: var(--fontsize);
        height: var(--fontsize);
        padding: 8px 7px;
        height: var(--fontsize);
        line-height: var(--fontsize);
        // vertical-align: bottom;
        // display: inline-block;
        // padding: 8px 10px;
    }
`
const Hamburger = props => <div id="hamburger" className={props.showSidebar ? "change" : ""} onClick={() => props.setShowSidebar()}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
</div>
const Curtain = props => {
    // const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null
    // const curtain = document.querySelector('.curtain') 
    // const instance = curtain !== null ? basicScroll.create({
    const instance = basicScroll.create({
        from: '20vh',
        to: '70vh',
        props: {
            '--height': {
                from: '60vh',
                to: '4vh',
            },
            // feature container height
            '--feight': {
                from: '37vh',
                to: '0',
            },
            '--fontsize': {
                from: '10vh',
                to: '2.5vh',
            },
            '--textheight': {
                from: '23vh', 
                to: '4vh',
            }
        }
    // }) : ''
    })
    // const instanceStart = curtain !== null ? instance.start() : ''
    instance.start()
    const sssideber = x => {
        props.setShowSidebar(!props.showSidebar)
    }
    return (
        <Curtaincss className="element" >
            <div className="featurecontainer">
                <Feature />
            </div>
            <div className="bottom">
                <div className="leftext">
                    <span className="leftextel"><Hamburger setShowSidebar={sssideber} showSidebar={props.showSidebar} /></span>
                    <span className="leftextel"><img src={logo} alt=""/></span>
                    <span className="leftextext">Newberry Transcribe</span></div>
                <div className="rightext">Be a part of history</div>
            </div>
        </Curtaincss>
    )
}
export default Curtain