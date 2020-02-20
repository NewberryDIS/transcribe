import React from 'react'
import styled from '@emotion/styled'

const Sidebarcss = styled.div`
    position: fixed;
    width: 20vw;
    height: 100vh;
    background-color: rgba(255,255,255,1);
    top: 0;
    left: 0;
    margin: 0;
    border: 1px solid black;
    z-index: 1000;
`

const Sidebar = () => (
    <Sidebarcss>
        sidebar
    </Sidebarcss>
)

export default Sidebar