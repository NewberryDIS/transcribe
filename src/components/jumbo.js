import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from './styles'
import logo from '../images/drawing.svg'

const Jumbocss = styled.div`
    // position: fixed;
    display: block;
    position: sticky;
    top: 0;
    .topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4vh;
        display: flex;

        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},1);
        font-family: ${fonts.serif};
        img {
            // vertical-align: bottom;
            height: 3vh;
            padding: 5px 7px;
            filter: drop-shadow(0 0 10px rgba(${colors.fg},0.75))
        }
        .hamburger, .nlogo, .titletext {
            display: inline-block;
        }
        .titletext {
            // position: sticky;
            flex: 1;        
            // text-align: center;
            // will-change: margin-left;
            // margin-left: var(--leftish);
        }
        .titletext .blurone {

            filter: blur(var(--blurone));
            // font-size: var(--fontsize);
            font-size: 3vh;
            // line-height: var(--textheight);
            transition: transform .1s linear;
            will-change: filter, font-size;
            font-family: ${fonts.serif};
            display: inline-block;
        }
    }
    @media only screen 
        and (min-width : 750px) { 
            #hamburger {
                display: none;
            }
            
    }
    @media only screen 
        and (max-width : 750px) { 
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
    .subtitletext .blurtwo {
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},0.5);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        filter: blur(var(--blurtwo));
        font-size: var(--fontsize);
        transition: transform .1s linear;
        will-change: filter, font-size;
        font-family: ${fonts.serif};
        position: fixed;
        top: 40vh;
        left: 0;
        right: 0;
        text-align: center;
    }
    .letter {
        display: inline-block;
        transform: translate(var(--tx), 0) rotate(var(--r));
        will-change: transform;
    }
`
const Hamburger = props => <div id="hamburger" className={props.showSidebar ? "change" : ""} onClick={() => props.setShowSidebar()}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
</div>
const Jumbo = props => {
    // let tx, ty, r
    const curtainText = 'Newberry Transcribe' 
    const header = curtainText.split('').map((i, index) => {
        const tx = Math.round((Math.random() * 70),0)
        // const ty = Math.round((Math.random() * 200),0)
        const r =  Math.round((Math.random() * 270),0)
        const posneg = Math.round(Math.random()) === 1 ? '' : '-'
        i = i === ' ' ? '\u00A0' : i
        return (
                <span key={index} className="letter" data-tx={tx} data-r={posneg + r}>{i}</span>
                // <span key={index} className="letter" data-tx={tx} data-ty={ty}  data-r={posneg + r}>{i}</span>
            )
    })
    const instances = []
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null   
    const letters = typeof document !== `undefined` ? document.querySelectorAll('.letter') : null
    letters.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') + 'vw'
        // const ty = elem.getAttribute('data-ty') + 'px'
        const r = elem.getAttribute('data-r') + 'deg'
        instances.push(basicScroll.create({
            elem: curtain,
            from: '0px',
            to: '500px',
            direct: elem,
            props: {
                '--tx': {
                    from: tx,
                    to: '0'
                },
                // '--ty': {
                //     from: ty,
                //     to: '0'
                // },
                '--r': {
                    from: r,
                    to: '0'
                }
            }
        }))

    })
    const instance = basicScroll.create({
        from: '0px',
        to: '500px',
        props: {
            // feature container height
            '--feight': {
                from: '37vh',
                to: '0',
            },
            '--fontsize': {
                from: '10vh',
                to: '3vh',
            },
            '--textheight': {
                from: '23vh', 
                to: '4vh',
            },
            '--blurone': {
                from: '1px',
                to: '0px'
            },
            '--blurtwo': {
                from: '0px',
                to: '50px'
            },
            '--leftish': {
                from: '20%',
                to: '0%'
            },
        }
    // }) : ''
    })
    
    // const instanceStart = curtain !== null ? instance.start() : ''
    instance.start()
    instances.forEach((i) => i.start())
    return (
        <Jumbocss id="curtain">
            <div className="topbar">
                <div className="hamburger"><Hamburger /></div>
                <div className="nlogo"><img src={logo} alt=""/></div>
                <div className="titletext"><span className="blurone">{header}</span></div>
            <div className="jumbler"></div>
            </div>
            <div className="subtitletext"><span className="blurtwo">Become a part<br/>of history</span></div>
        </Jumbocss>
    )
}
export default Jumbo