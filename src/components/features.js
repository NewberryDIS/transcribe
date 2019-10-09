import { Link } from "gatsby"
import React from "react"
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import {Container, Row, Flexbox } from './pieces'
import bg from '../images/feature.jpg'

const Featurebox = styled.div`
    background: white;
    border: 1px solid rgba(0,0,0,0.75);
    -webkit-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    position: relative;
    padding: 20px;
    margin: 15px 15% auto auto;
    @media (max-width: 700px) {
        margin: 15px auto 0 auto;
    }
    & h2 {
        font-style: italic;
    }
`

const Features = () => (
    <section css={css`
        position: relative;
        background-image: url(${bg});
        background-position: 25% 25%;
        {/* background-size: cover; */}
`}>
        <Container >
                    <Featurebox>
                        <h2>this would be a featured item</h2>
                        <p>a lil text might go here</p>
                    </Featurebox>
        </Container>
    </section>
)

export default Features