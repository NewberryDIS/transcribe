import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import bg from '../images/bg.jpg'
import { mq } from './mediaQueries'

const Barwrapper = styled.div`
    position: sticky;
    z-index: 4;
    top: 0;
    left: 0;
    right: 0;
    height: 4vh;
    width: 100%;
    background: url(${bg});
    background-size: cover;
    background-position-x: 0;
    background-position-y: 0;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    line-height: 4vh;
    .text {
        font-size: 4vh;
        text-transform: uppercase;
        font-family: 'Lato', sans-serif;
        display: block;
        ${mq[0]} {
            margin: auto;
        }
        ${mq[1]} {
            margin: auto;
        }
        ${mq[2]} {
            margin: 0;
        }
        ${mq[3]} {
            margin: 0;
        }

    }    
`

const Bar = props => (
    <Barwrapper><span className="text">Newberry Transcribe</span></Barwrapper>
)

export default Bar
//<Barwrapper><span className="letter">ok whatevr</span></Barwrapper>
