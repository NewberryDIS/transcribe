import React from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'

const Curtaincss = styled.div`
    z-index: 10;
    // background: white;
    width: 100%;
    height: 80vh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    .textArea {
        flex: 1;
    }
    .anchor {
        flex-basis: 5px;
        background: black;
        opacity: 0; // Disable to view the anchor
    }
`

const Curtain = () => {
    const subTitle = 'Help unlock the past!'
    const title = 'Newberry Transcribe'
    const instances = []
    const anchor = typeof document !== `undefined` ? document.querySelector('.anchor') : null    
    const blurs = typeof document !== 'undefined' ? [document.querySelector('.textArea'), document.querySelector('.blureffect4')] : null
    var jSLintSucks = blurs !== null ? instances.push(
            basicScroll.create({
                elem: anchor,
                from: '0px',
                to: '100vh',
                direct: blurs[1],
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
                direct: blurs[0],
                props: {
                    '--blur': {
                        from: '52px',
                        to: '0px'
                    }
                }
            })
        ) : ''
    instances.forEach((instance) => instance.start())
    return (
    <Curtaincss>
        <div className="textArea" >
        curtain

        </div>
        <div className="anchor"></div>
    </Curtaincss>
)
    }

export default Curtain