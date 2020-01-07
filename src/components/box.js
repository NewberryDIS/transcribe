import React from 'react'
import styled from '@emotion/styled'

const Boxcss = styled.div`
    box-shadow: inset 0 0 8px rgba(37,37,37,1);
    height: 400px;
    border: 1px solid black;
    flex-basis: 20vw;
    margin: 10px;
    background: white;
    background: url(${props => props.img});
    background-size: cover;
    
`

const Box = props => (
    <Boxcss img={props.img}>
        {props.title}
    </Boxcss>
)

export default Box