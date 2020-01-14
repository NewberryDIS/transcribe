import React from 'react'
import styled from '@emotion/styled'

const Footercss = styled.footer`
    display: flex;
    flex-basis: 70px;
    flex-shrink: 0;
    background-color: rgba(207,207,207,1);
    z-index: 0;
    color: rgba(37,37,37,1);
    justify-content: space-between;
    // box-shadow: inset 0 0 10px ;
    // box-shadow: inset 0px 5px 10px 0px rgba(37,37,37,1);
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