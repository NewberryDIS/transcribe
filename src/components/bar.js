import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import bg from '../images/bg.jpg'

const Barwrapper = styled.div`
    position: sticky;
    z-index: 4;
    top: 0;
    left: 0;
    right: 0;
    height: 4vh;
    background: url(${bg});
    background-size: cover;
    background-position-x: 0;
    background-position-y: 0;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    line-height: 4vh;
    .letter {
        font-size: 4vh;
        text-transform: uppercase;
        font-family: 'Lato', sans-serif;
    }
`

const Bar = props => (
    <Barwrapper><span className="letter">ok whatevr</span></Barwrapper>
)

export default Bar