import React from 'react'
import styled from '@emotion/styled'

const Footercss = styled.footer`
    display: flex;
    background-color: rgba(207,207,207,1);
    color: rgba(37,37,37,1);
    justify-content: space-between;
    box-shadow: inset 0 0 10px rgba(37,37,37,1);
    .footersection {
        font-family: sans-serif;
        flex: 1;
        padding: 25px;
        text-align: center;
        &:first-of-type {
            text-align: left;
        }
        &:last-of-type {
            text-align: right;
        }
    }
`

const Footer = () => (
    <Footercss>
        <div className="footersection">left footer section</div>
        <div className="footersection">center footer section</div>
        <div className="footersection">right footer section</div>
    </Footercss>
)

export default Footer