// import React from "react"
import Body from '../components/body'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import CurtainPage from "../components/curtain"
// import { colors } from '../components/pieces'
import bg from '../images/featured.jpg'

const IndexPage = () => {
    return (
        <div css={css`
            position: relative;
            background: url(${bg});
            background-size: 110%;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        `}> 
            <CurtainPage />
            <Body />
        </div>

    )
}

export default IndexPage