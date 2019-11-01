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
    const [filteredContent, setFilteredContent] = useState(dataContent[1]);
    const [show, setShow] = useState(true);
    return (
    <section>
        <Container wrap={'nowrap'} css={css`
            justify-content: stretch;
        `}>
        {console.log(filteredContent.length)}
            <Sidebar show={show} setShow={setShow} setFilteredContent={setFilteredContent} filteredContent={filteredContent} dataContent={dataContent} />
            <Cardsection items={filteredContent} setDataContent={setFilteredContent}/>
        </Container>
    </section>
    )
}
export default Body