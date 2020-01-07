import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'

const Featurecss = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .feature {
        box-shadow: inset 0 0 10px rgba(207,207,207,1);
        margin: 5vmin;
        width: 25vmin;
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 10vmin;
        // padding: var(--padding);
        border: 1px solid white;
        opacity: var(--opacity);
        will-change: opacity, padding;
    }
`

const Feature = props => {
    const text = "This is a feature"
    const feature = typeof document !== `undefined` ? document.querySelector('.feature') : null
    // const instance = curtain != null ? basicScroll.create({
    const instance = basicScroll.create({
        elem: feature,
        from: 0,
        to: '70vh',
        props: {
            '--opacity': {
                from: 0.99,
                to: 0.01,
            },
            '--padding': {
                from: '10vmin',
                to: 0,
            }
        }
    // }) : ''
    })
    // instance.start()

    return (
        <Featurecss>
            <div className="feature">
                {text}
            </div>
        </Featurecss>
    )
}

export default Feature