import React from 'react'
import { css } from '@emotion/core'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from '../components/csscomponents'
import logo from '../images/drawing.svg'

const Topbarcss = styled.div`
    position: relative;
    .topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2rem;
        display: flex;
        z-index: 100;
        box-shadow: inset 0 0 10px rgba(${colors.hl},1);
        border: 2px solid rgba(${colors.hl}, 1);
        // text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},1);
        font-family: ${fonts.serif};
        img {
            height: 1.9rem;
            line-height: 2rem;
            padding: 2px 7px;
        }
        .nlogo, .titletext {
            display: inline-block;
        }
        .titletext {
            flex: 1;        
        }
        .titletext .blurone {

            filter: blur(var(--blurone));
            // font-size: var(--height);
            font-size: 1.5rem;
            line-height: 2rem;
            transition: transform .1s linear;
            will-change: filter, font-size;
            display: inline-block;
        }
    }
    .letter {
        display: inline-block;
        transform: translate(var(--tx), 0) rotate(var(--r));
        will-change: transform;
        font-family: ${fonts.serif};
        font-weight: 700;
        z-index: 500;
    }
    .carrot {
        vertical-align: middle;
        line-height: 2rem;
        font-size: 1.75rem;
        padding: 4px;
        // margin-right: 5px;
        transition: 0.2s;
        filter: drop-shadow(0 0 10px rgba(${colors.fg},0.75));
        cursor: pointer;
        &:hover {
            transform: rotate(180deg);
        }
    }
    .dislink, .homelink {
        transition: color 0.2s;
        text-decoration: none;
        color: rgba(${colors.fg}, 0.8);
        background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
        background-size: 0% 2px;
        background-position: 0% 105%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s, color 0.2s;
        &:hover {
            color: rgba(${colors.fg}, 1);
            background-size: 100% 3px;
        }
    }   
    .menu {
        background: white;
        z-index: 1000;
    }

    @media and (min-width : 850px) { 
        .menu {
            display: none;
        }
    }
    @media and (max-width : 850px) {
        .menu {
            display: block;
        }
    }
`

const Topbar = props => {
    const curtainText = [['Digital Newberry: ', '/','dislink'],['Newberry Transcribe', '/transcribe/','homelink']]
    const breadcrumbs = curtainText.map(ct => {
        const letterarray = ct[0].split('').map((i,index) => {
            const tx = Math.round((Math.random() * 70),0)
            const r =  Math.round((Math.random() * 330),0)
            const posneg = Math.round(Math.random()) === 1 ? '' : '-'
            i = i === ' ' ? '\u00A0' : i
            return (
                <span key={index} className="letter" data-tx={tx} data-r={posneg + r}>{i}</span>
            )
        }) 
        return <a href={ct[1]} key={ct[2]} className={ct[2]} target={ct[2] === 'dislink' ? "_blank" : ''} rel={ct[2] === 'dislink' ? "noopener noreferrer" : ''}>{letterarray}</a>
    })
    const instances = []
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null   
    const letters = typeof document !== `undefined` ? document.querySelectorAll('.letter') : null
    const esLintSucks = letters !== null ? letters.forEach((elem) => {
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
                '--r': {
                    from: r,
                    to: '0'
                }
            }
        }))
    }) : ''
    instances.forEach((i) => i.start())

    const clickstopper = e => {
        e.stopPropagation()
        props.setShowMenu(!props.showMenu)
        console.log('stop it')
    }
    return (
        <Topbarcss id="topbar">
            <div className="topbar">
                <div className="nlogo"><a href="https://www.newberry.org/" target="_blank" rel="noopener noreferrer"><img src={logo} alt=""/></a></div>
                <div className="titletext"><span className="blurone">{breadcrumbs}</span></div>
                {props.showMenu !== undefined ? <div className="menu" onClick={(e) => clickstopper(e)} onKeyUp={(e) => clickstopper(e)} role="button" tabIndex={0}>
                    <MenuButton showMenu={props.showMenu} />
                </div> : '' }
                <div className="jumbler"></div>
            </div>
        </Topbarcss>
    )
}
export default Topbar

const MenuCss = styled.div`
    .container {
        display: inline-block;
        cursor: pointer;
        line-height: 50px;
        z-index: 1000;
        background: rgba(${colors.bg},1);
    }
    @media (min-width: 850px) {
        .container {
            display: none;
        }
    }
    @media (max-width: 849px) {
        .container {
            display: none;
        }
    }
    
    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: rgba(${colors.fg}, 1);
        margin: 4px 0;
        transition: 0.2s;
    }
    
    .change .bar1 {
        -webkit-transform: rotate(-45deg) translate(-8px, 5px);
        transform: rotate(-45deg) translate(-8px, 5px);
    }
    
    .change .bar2 {opacity: 0;}
    
    .change .bar3 {
        -webkit-transform: rotate(45deg) translate(-7px, -5px);
        transform: rotate(45deg) translate(-7px, -5px);
    }


`
const MenuButton = props => {
 
    return (
        <MenuCss css={css`
        
    @media and (min-width : 850px) { 
            display: none;
    }
    @media only screen and (max-width : 850px) {
            display: block;
    }
    `} >
            <div className={props.showMenu ? "change container" : "container"} >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </MenuCss> 
    )
}