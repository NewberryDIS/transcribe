import React from "react"
import { Link } from "gatsby"
import Navbar from '../components/navbar'
import Header from '../components/header'
import Features from '../components/features'
import Body from '../components/body'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import bg from '../images/longpaper.jpg'

const IndexPage = () => (
  <div css={css`
    position: relative;
    background-image: url(${bg});
    background-position: 50% 0%;
    background-size: cover;
    background-attachment: fixed;
  `}>
    <Features />
    <Navbar />
    <Header />
    <Body />
  </div>
)

export default IndexPage
