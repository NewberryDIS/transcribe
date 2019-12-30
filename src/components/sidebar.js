import React from 'react'
import styled from '@emotion/styled'

const Sidebarcss = styled.div`
    position: fixed;
    width: 400px;
    height: 100vh;
    top: 0;
    left: 0;
    margin: 0;
    border: 1px solid black;
    z-index: -1;
`

const Sidebar = () => (
    <Sidebarcss>
        sidebar
    </Sidebarcss>
)

export default Sidebar