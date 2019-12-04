
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as basicScroll from 'basicscroll'
import { colors, logo, z, FontSizes } from './pieces'

const Curtain = () => {
    const instances = []
    // swap these commented lines for gh-pages deploy
    // const anchor = typeof document !== `undefined` ? document.querySelector('.anchor') : null    
    const anchor = document.querySelector('.anchor')
   
    // const lba = typeof document !== `undefined` ? document.querySelectorAll('.letter, .border') : null
    // lba !== null ? lba.forEach((elem) => {
    // document.querySelectorAll('.letter-sm, .letter-lg').forEach((elem) => {
    instances.push(
        basicScroll.create({
            elem: anchor,
            from: '0px',
            to: '100vh',
            direct: document.querySelector('.blureffect1'),
            props: {
                '--blur': {
                    from: '0px',
                    to: '50px'
                }
            }
        }),
        basicScroll.create({
            elem: anchor,
            from: '0px',
            to: '100vh',
            direct: document.querySelector('.blureffect4'),
            props: {
                '--blur': {
                    from: '50px',
                    to: '0px'
                }
            }
        })
    )
    // }) : ''
    // })
    instances.forEach((instance) => instance.start())
    return (
        <div id="curtain" css={css`
            z-index: ${z.btm};
            min-height: 150vh;
            position: relative;
            top: 0;
            display: flex;
            flex-direction: column;
            p {
                margin-bottom: 1px;
            }
            .letter-lg, .letter-sm {
                color: ${colors.fg}
            }
            .letter-lg {
                font-size: ${FontSizes.xxl};
                text-transform: uppercase;
            }
            .letter-sm {
                text-transform: uppercase;
                // font-family: 'Kaushan Script', cursive;
                font-size: ${FontSizes.xl};
            }
            .curtain {
                a {
                    text-decoration: none;
                }
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
                .headline-lg {
                    position: relative;
                    padding: .4em .6em .45em;
                    line-height: 1;
                }
                .blureffect1,
                .blureffect2,
                .blureffect3,
                .blureffect4 {
                    display: block;
                    filter: blur(var(--blur));
                    transition: transform .1s linear;
                    will-change: filter;
                }
            }
        `}>
            <div className="curtain" css={css`
                
            `}>
                <div className="anchor"></div>
                <div className="container ">
                    <h1 className="headline-lg">
                        <a href="#top">
                            <p className="letter-sm blureffect1 ">Become a part of history</p>
                            <p className="blureffect4 letter-lg">Newberry Transcribe</p>
                            {/* <p className="letter-lg">Newberry&nbsp;<span className="blureffect4">Transcribe</span></p> */}
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