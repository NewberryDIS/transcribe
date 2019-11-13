import React, { useState } from "react"
import Header from '../components/header'
import Features from '../components/features'
import Body from '../components/body'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

const IndexPage = () => {
    return (
        <div css={css`
            position: relative;
        `}>
            <Features />
            <Header />
            <Body />
        </div>

    )
}

export default IndexPage