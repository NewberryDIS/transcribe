import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from './styles'
import logo from '../images/drawing.svg'
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io'

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
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},1);
        font-family: ${fonts.serif};
        img {
            // vertical-align: bottom;
            height: 1.5rem;;
            padding: 5px 7px;
            filter: drop-shadow(0 0 10px rgba(${colors.fg},0.75))
        }
        .hamburger, .nlogo, .titletext {
            display: inline-block;
        }
        .titletext {
            flex: 1;        
        }
        .titletext .blurone {

            filter: blur(var(--blurone));
            // font-size: var(--height);
            font-size: 1.5rem;
            transition: transform .1s linear;
            will-change: filter, font-size;
            display: inline-block;
        }
    }
    @media only screen 
        and (min-width : 750px) { 
            .carrot {
                display: none;
            }
            
    }
    @media only screen 
        and (max-width : 750px) {
            .carrot {
                display: block;
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
`
// const Dropdownbutton = props => <div id="menu" >
    
// </div>
// const Hamberder = props => <div id="hamburger" className={props.showDropdown ? 'change' : ''} onClick={() => props.dropDowner()}>
//     <div className="bar1"></div>
//     <div className="bar2"></div>
//     <div className="bar3"></div>
// </div>
const Topbar = props => {
    const dropDowner = () => {
        props.setShowDropdown(!props.showDropdown)
    }
    const curtainText = [['Digital Newberry: ', 'http://www.google.com','dislink'],['Newberry Transcribe', '/','homelink']]
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
        return <a href={ct[1]} key={ct[2]} className={ct[2]} target="_blank" rel="noopener noreferrer">{letterarray}</a>
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
    const instance = basicScroll.create({
        from: '0px',
        to: '500px',
        props: {
            '--blurone': {
                from: '1px',
                to: '0px'
            },
        }
    // }) : ''
    })
    
    // const instanceStart = curtain !== null ? instance.start() : ''
    instance.start()
    instances.forEach((i) => i.start())
    return (
        <Topbarcss id="topbar">
            <div className="topbar">
                <div className="nlogo"><a href="https://www.newberry.org/" target="_blank" rel="noopener noreferrer"><img src={logo} alt=""/></a></div>
                <div className="titletext"><span className="blurone">{breadcrumbs}</span></div>
                <div className="menu" onClick={() => dropDowner()} onKeyUp={() => dropDowner()} role="button" tabIndex={0}>
                    {props.showDropdown ? <IoIosCloseCircle size="1.5rem" className="carrot" /> : <IoIosArrowDropdownCircle size="1.5rem" className="carrot" />}
                </div>
                <div className="jumbler"></div>
            </div>
        </Topbarcss>
    )
}
export default Topbar