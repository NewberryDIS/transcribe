import React from "react"
import styled from '@emotion/styled'
import {Container, Row, FontSizes} from './pieces'
import pic from '../images/img.jpg'
import {cardArray} from './cardarray'


/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import Masonry from 'react-masonry-css'

const Card = styled.div`
    flex: 1;
    width: 200px;
    min-height: 200px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: white;
    p {
        padding: 0 10px;
        line-height: ${FontSizes.xs};
        font-size: ${FontSizes.xs};
    }
    h3 {
        margin: 7px 0;
        padding: 0 10px;
        font-size: ${FontSizes.sm};
    }
`
const Main = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    .masonry-grid {
        display: flex;
        width: auto;
        margin: auto;
    }
    .masonry-grid_column {
        padding-left: 3px;
        background-clip: padding-box;
    }
    .masonry-grid_column > div {
        margin-bottom: 3px;
    }
`
const cards  = cardArray.map((el, i) =>
    <Card key={i} ><img src={pic} css={css`flex-basis: auto; width: ${el.w}; height: ${el.h}px;`}/><h3>{el.title}</h3><p>{el.desc}</p></Card>
);

const Cardsection = props => {
    const showBreakpoints = {
        default: 5,
        1200: 4,
        1050: 3,
        800: 2,
        650: 1
    }
    const hideBreakpoints = {
        default: 5,
        1100: 4,
        850: 3,
        650: 2,
        400: 1
      }
    return (
    <Main>
        <Masonry breakpointCols={props.show ? showBreakpoints : hideBreakpoints} className="masonry-grid" columnClassName="masonry-grid_column">
            {cards}
        </Masonry>
    </Main>
    )
}



export default Cardsection