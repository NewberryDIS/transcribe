import React from 'react'
import bg from '../images/bg.jpg'
import styled from '@emotion/styled'
import * as basicScroll from 'basicscroll'
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Curtainwrapper = styled.div`
    width: 100%;
    position: fixed;
    z-index: 4;
    top: 0;
    background: url(${bg});
    background-size: cover;
    background-position-x: var(--pos);
    background-position-y: var(--pos);
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    &.curtain {
        height: var(--height);
    }
`
const scrollDistance = ['40vh', '80vh']

const Soup = () => {
    const instances = []
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null   
    const letters = typeof document !== `undefined` ? document.querySelectorAll('.letter') : null
    // const background = typeof document !== `undefined` ? document.querySelectorAll('.background') : null
    const background = typeof document !== `undefined` ? document.querySelector('.background') : null
    const headline = typeof document !== `undefined` ? document.querySelector('.headline') : null
    var jSLintSucks =  letters !== null ? letters.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') + 'px'
        const ty = elem.getAttribute('data-ty') + 'px'
        const r = elem.getAttribute('data-r') + 'deg'
        instances.push(basicScroll.create({
            elem: curtain,
            from: '0px',
            to: '40vh',
            direct: elem,
            props: {
                '--tx': {
                    from: tx,
                    to: '0'
                },
                '--ty': {
                    from: ty,
                    to: '0'
                },
                '--r': {
                    from: r,
                    to: '0'
                },
                '--h': {
                    from: '10vh',
                    to: '4vh'
                },
            }
        }))

    }) : ''
    instances.push(basicScroll.create({
        elem: headline,
        from: '0px',
        to: '80vh',
        direct: headline,
        props: {
            '--t': {
                from: '40vh',
                to: '0px'
            },
            '--l': {
                from: '25vw',
                to: '0px'
            }
        }
    }))
    instances.push(basicScroll.create({
        elem: background,
        from: '0px',
        to: '80vh',
        direct: background,
        props: {
            '--pos': {
                from: '0',
                to: '100%'
            }
        }
    }))
    instances.forEach((instance) => instance.start())
    const curtainText = 'Ok Whatevr' 
    const header = curtainText.split('').map((i, index) => {
        const tx = Math.round((Math.random() * 100),0)
        const ty = Math.round((Math.random() * 200),0)
        const r =  Math.round((Math.random() * 100),0)
        const posneg = Math.round(Math.random()) === 1 ? '' : '-'
        i = i === ' ' ? '\u00A0' : i
        return (
                <span key={index} className="letter" data-tx={posneg + tx} data-ty={posneg + ty}  data-r={posneg + r}>{i}</span>
            )
    })
    return (
        <div id="curtain" css={css`
            z-index: 1;
            position: relative;
            .letter-lg {
                font-size: 2em;
                text-transform: uppercase;
            }
            .letter {
                text-transform: uppercase;
                font-family: 'Lato', sans-serif;
            }
            .headline {
                position: absolute;
                top: var(--t);
                left: var(--l);
                margin: auto;
                line-height: 4vh;
            }
            .letter {
                font-size: var(--h);
                display: inline-block;
                transform: translate(var(--tx), var(--ty)) rotate(var(--r));
                will-change: transform;
            }
        `}>
                <h1 className="headline">
                    {header}
                </h1>
        </div>
    )
}

const Curtain = () => {
    const instances = []
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null   
    var jSLintSucks = curtain !== null ? instances.push(
        basicScroll.create({
            elem: curtain,
            from: '0px',
            to: '80vh',
            direct: curtain,
            props: {
                '--height': {
                    from: '90vh',
                    to: '4vh'
                }
            }
        })
    ) : ''
    instances.forEach((instance) => instance.start())
    return (
        <Curtainwrapper className='background curtain'>
            <Soup /> 
        </Curtainwrapper>
    )
}

export default Curtain