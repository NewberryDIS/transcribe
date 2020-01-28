import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from './styles'
import { Link } from 'gatsby'

const Featurecss = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .feature {
        font-family: ${fonts.serif};
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        margin: 5vmin;
        // width: 75vw;
        background: rgba(${colors.bg},1);
        color: rgba(${colors.fg},1);
        padding: 1.5vmin 3vmin;
        border: 1px solid rgba(${colors.fg},1);
        opacity: var(--opacity);
        will-change: opacity;
        h3 {
            font-size: calc(12px + 1vmin);
            line-height: calc(12px + 1vmin);
        }
    }
`

const Feature = props => {
    const text = "This is a feature"
    const feature = typeof document !== `undefined` ? document.querySelector('.feature') : null
    // const instance = curtain != null ? basicScroll.create({
    const instance = basicScroll.create({
        elem: feature,
        from: 0,
        to: '50%',
        props: {
            '--opacity': {
                from: 0.99,
                to: 0.01,
            },
        }
    // }) : ''
    })
    instance.start()

    return (
        <Featurecss>
            <div className="feature">
                <h3>Help unlock the past!</h3>
                <p>Turn handwritten letters and diaries into searchable text available to researchers worldwide</p>
                <p><Link to={'about'}>Learn more</Link> about this project, view our <Link to={'guidelines'}>transcription guidelines</Link>, or simply select a document to get started immediately</p>
            </div>
        </Featurecss>
    )
}

export default Feature