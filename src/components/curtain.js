
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import bg from '../images/textbg.jpg'
import * as basicScroll from 'basicscroll'
import { colors, logo, z } from './pieces'

const Curtain = () => {
    const instances = []
    const anchor = typeof document !== `undefined` ? document.querySelector('.anchor') : null    
    // const anchor = document.querySelector('.anchor')
    // Create an animation for each border and letter
    const lba = typeof document !== `undefined` ? document.querySelectorAll('.letter, .border') : null
        lba !== null ? lba.forEach((elem) => {

        // Get the end values from the data attributes
        const tx = elem.getAttribute('data-tx') + 'px'
        const ty = elem.getAttribute('data-ty') + 'px'
        const r = elem.getAttribute('data-r') + 'deg'

    // Crate an instance for the current element and store the instance in an array.
    // We start the animation later using the instances from the array.
        instances.push(basicScroll.create({
            elem: anchor,
            from: 'top-top',
            to: 'top-bottom',
            direct: elem,
            props: {
            '--tx': {
                from: '0',
                to: tx
            },
                    '--ty': {
                from: '0',
                to: ty
            },
                    '--r': {
                from: '0',
                to: r
            }
            }
        }))

    }) : ''
    instances.forEach((instance) => instance.start())
    const stwo = logo[1]
    const header = stwo.split('').map((i) => {
        const tx = Math.round((Math.random() * 200),0)
        const ty = Math.round((Math.random() * 200),0)
        const r =  Math.round((Math.random() * 200),0)
        const posneg = Math.round(Math.random()) === 1 ? '' : '-'
        i = i === ' ' ? '\u00A0' : i
        return (
                <span className="letter letter-sm" data-tx={posneg + tx} data-ty={posneg + ty}  data-r={posneg + r}>{i}</span>
            )
    })
    // const header = stringit(hea)
    const stone = logo[0]
    const subheader = stone.split('').map((i) => {
        const tx = Math.round((Math.random() * 200),0)
        const ty = Math.round((Math.random() * 200),0)
        const r =  Math.round((Math.random() * 200),0)
        const posneg = Math.round(Math.random()) === 1 ? '' : '-'
        i = i === ' ' ? '\u00A0' : i
        return (
                <span className="letter letter-lg" data-tx={posneg + tx} data-ty={posneg + ty}  data-r={posneg + r}>{i}</span>
            )
    })

    return (
        <div id="curtain" css={css`
            z-index: ${z.btm};
            min-height: 200vh;
            position: relative;
            top: 0px;
            display: flex;
            flex-direction: column;
            p {
                margin-bottom: 0;
            }
            .letter-lg, .letter-sm {
                color: ${colors.fg}
            }
            .letter-lg {
                font-size: 2em;

                text-transform: uppercase;
            }
            .letter-sm {
                text-transform: uppercase;
                // font-family: 'Homemade Apple', cursive;
                // font-family: 'Kaushan Script', cursive;
                font-size: 1.3em;
            }
            .curtaintop, .curtainbottom {

                flex: 1;
                font-family: 'Lato', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                // height: 100vh;
                background-attachment: fixed;
                .anchor {
                    position: absolute;
                    top: 75vh;
                    width: 20px;
                    height: 4px;
                    background: black;
                    opacity: 0; // Disable to view the anchor
                }
                
                .container {
                    z-index: 1;
                    position: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100%;
                }
                
                .headline-sm, .headline-lg {
                    position: relative;
                    padding: .4em .6em .45em;
                    line-height: 1;
                }
                .headline-sm {

                    // height: 100vh;
                    // font-size: 3em;
                    // line-height: 15vh;
                }
                .headline-lg {

                    // height: 100vh;
                    // font-size: 6em;
                    // line-height: 55vh;
                }
                
                .border {
                    --size: 5px;
                    position: absolute;
                    background: ${colors.fg};
                    color: ${colors.fg};
                    transform: translate(var(--tx), var(--ty)) rotate(var(--r));
                    will-change: transform;
                    
                    &--top {
                        top: 0;
                        right: 0;
                        left: 0;
                        height: var(--size);
                    }
                    
                    &--right {
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: var(--size);
                    }
                    
                    &--bottom {
                        right: 0;
                        bottom: 0;
                        left: 0;
                        height: var(--size);
                    }
                    
                    &--left {
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: var(--size);
                    }
                }
                
                .letter {
                    display: inline-block;
                    transform: translate(var(--tx), var(--ty)) rotate(var(--r));
                    will-change: transform;
                }
            }
            .curtaintop {
                // font-size: 15vh;
                // line-height: 40vh;
            }
        `}>
            <div className="curtainbottom" css={css`
                
            `}>
                <div class="anchor"></div>
                <div class="container">
                    <h1 class="headline-sm">
                    </h1>
                </div>
                <div class="container">
                    <h1 class="headline-lg"><a href="#top" >

                    <span class="border border--top" data-tx="-40" data-ty="20" data-r="-20"></span>
                    <span class="border border--right" data-tx="-10" data-ty="10" data-r="30"></span>
                    <span class="border border--bottom" data-tx="60" data-ty="0" data-r="40"></span>
                    <span class="border border--left" data-tx="50" data-ty="-80" data-r="20"></span>

                        <p>{header}</p>
                        <p>{subheader}</p>
                    </a>
                    </h1>
                </div>
            </div>
        </div>
    )
}


const CurtainPage = () => {
    return (
        <div css={css`
            position: relative;
        `}>
            <Curtain />
        </div>
    )
}
export default CurtainPage