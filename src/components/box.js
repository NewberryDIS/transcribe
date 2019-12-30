import React from 'react'
import styled from '@emotion/styled'

const Boxcss = styled.div`
    height: 400px;
    border: 1px solid black;
    flex-basis: 20vw;
    margin: 10px;
    background: url(${props => props.img});
    background-size: cover;
    `

const Box = props => (
    <Boxcss img={props.img}>
        {props.title}
    </Boxcss>
)

export default Box