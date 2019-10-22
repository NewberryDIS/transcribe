import React, { useState }  from "react"
import Sidebar from '../components/sidebar'
// import Masonry from '../components/masonry'
import {Container} from './pieces'
// import Cardmaker from './cardmaker'
import ClientFetchingExample from './clientdata'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

// const data = require('../data/items.json');

const Body = () => {
    const [dataContent, setDataContent] = useState('');
    const [show, setShow] = useState(true);
    return (
    <section>
        
        <Container wrap={'nowrap'} css={css`
            justify-content: stretch;
        `}>
            <Sidebar show={show} setShow={setShow} dataContent={dataContent} />
        <ClientFetchingExample setDataContent={setDataContent}/>
        </Container>
    </section>
    )
}
export default Body