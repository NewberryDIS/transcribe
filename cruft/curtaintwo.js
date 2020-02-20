import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import bg from '../images/nbbg.jpg'

const Curtaincss = styled.div`
    z-index: 1000;
    width: 100%;
    position: fixed;
    top: 0;
    .curtain {
        height: var(--height);
        will-change: height;
        display: inline-block;
    }
    background: url(${bg});
    background-size: cover;
    background-position: 50% 0;
    .anchor {
        position: absolute;
        height: 4px;
        background: rgba(101,101,3,1);
        top: 70vh;
        width: 20px;
        opacity: 0;
    }
`

const Curtain = () => {
    const curtain = typeof document !== `undefined` ? document.querySelector('.curtain') : null
    // const instance = curtain !== null ? basicScroll.create({
    const instance = basicScroll.create({
        elem: curtain,
        from: 0,
        to: '70vh',
        props: {
            '--height': {
                from: '70vh',
                to: '5vh',
            }
        }
    // }) : ''
    })

    instance.start()

    return (
        <Curtaincss>
            <div className="curtain">Newberry Transcribe</div>
        </Curtaincss>
    )
}

export default Curtain