import { Link } from "gatsby"
import React, { useState, useEffect }  from "react"
import styled from '@emotion/styled'
import Sidebar from '../components/sidebar'
import Cardsection from '../components/cardsection'
import {Container, Row} from './pieces'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import Apipuller from "./apipuller";

const Features = () => {
    const [show, setShow] = useState(true);
    // useEffect(() => {
    //     function handleResize() {
    //       console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
        
    
    //     window.addEventListener('resize', handleResize)
    //   })
    //   return <div>w00t!</div>
    return (
    <section>
        <Container wrap={'nowrap'} css={css`
            justify-content: stretch;
        `}>
            <Sidebar show={show} setShow={setShow} />
            <Cardsection show={show} />
        </Container>
        <Apipuller />
    </section>
    )
}
export default Features
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
                window.removeEventListener('resize', handleResize);
        };
    });
    
    return width;
}