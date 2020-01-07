import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import Feature from './feature'
import bg from '../images/nbbg.jpg'
import bg1 from '../images/lgbg1.jpg'
import bg2 from '../images/lgbg2.jpg'
import bg3 from '../images/lgbg3.jpg'
import bg4 from '../images/lgbg4.jpg'
import bg5 from '../images/lgbg5.jpg'
import bg6 from '../images/lgbg6.jpg'
import bg7 from '../images/lgbg7.jpg'

const bgarray = [
    bg,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7
]

const Curtaincss = styled.div`
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: var(--height);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    background: url(${props => props.bg});
    .spacer {
        // flex: 1;
        height: var(--halfheight);
        overflow: hidden;
    }
    .banner {
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
                from: '15vmin',
                to: '2.5vmin',
            },
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
                    {/* Newberry Transcribe */}
                    Briny Crab Western
                </div>
                <div className="right">
                    {/* become a part of it */}
                    Be a part of history
                </div>
            </div>
        </Curtaincss>
    )
}
export default Curtain