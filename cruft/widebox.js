import React from 'react'
import styled from '@emotion/styled'

const Wideboxcss = styled.div`
    display: block;
    height: 400px;
    width: 100vw;
    left: 50%;
    right: 50%;
    overflow: hidden;
    background: lightblue;
    background-size: cover;
    `

const Widebox = props => (
    <Wideboxcss className="widebox" img={props.img}>
        <div className="asdf">{props.title}</div>
    </Wideboxcss>
)

export default Widebox