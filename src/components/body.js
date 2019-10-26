import React, { useState }  from "react"
import Sidebar from './sidebar'
import {Container} from './pieces'
import Cardsection from './cardsection'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

// const data = require('../data/items.json');

const items = require('../data/content.json')
const collections = require('../data/collections.json')
const decades = require('../data/decades.json')
const summary = require('../data/summary.json')
const allData = [summary, items, collections, decades]
const Body = () => {
    const [dataContent, setDataContent] = useState(allData);
    const [show, setShow] = useState(true);
    console.log(allData)
    return (
    <section>
        <Container wrap={'nowrap'} css={css`
            justify-content: stretch;
        `}>
            <Sidebar show={show} setShow={setShow} setDataContent={setDataContent} dataContent={dataContent} />
            <Cardsection items={dataContent} setDataContent={setDataContent}/>
        </Container>
    </section>
    )
}
export default Body