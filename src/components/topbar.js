import React from 'react'
import { useLocation } from 'react-router-dom'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from '../components/csscomponents'
import logo from '../images/drawing.svg'


function HeaderView() {
  let location = useLocation();
  console.log(location.pathname);
  return <span>Path : {location.pathname}</span>
}

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
            padding: 1px 3px;
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
    }
    .carrot {
        vertical-align: middle;
        line-height: 2rem;
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
        }}   
    .dislink {
        margin-right: 5px;
    }
`

const TopBar = () => {
    const curtainText = [['Digital Newberry: ', '//publications.newberry.org/','dislink'],['Newberry Transcribe', '//publications.newberry.org/transcribe','homelink']]
    let breadcrumbs
    const location = useLocation()
    if (location.pathname.indexOf('item') === -1 ){
        breadcrumbs = curtainText.map(ct => {
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
    } else {
        breadcrumbs = curtainText.map(ct => <a href={ct[1]} key={ct[2]} className={ct[2] + ' letter'} target={ct[2] === 'dislink' ? "_blank" : ''} rel={ct[2] === 'dislink' ? "noopener noreferrer" : ''}>{ct[0]}</a>)
    }
    return (
        <Topbarcss id="topbar">
            <div className="topbar">
                <div className="nlogo"><a href="https://www.newberry.org/" target="_blank" rel="noopener noreferrer"><img src={logo}alt=""/></a></div>
                <div className="titletext"><span className="blurone">{breadcrumbs}</span></div>
                <div className="jumbler"></div>
            </div>
        </Topbarcss>
    )
}
export default TopBar