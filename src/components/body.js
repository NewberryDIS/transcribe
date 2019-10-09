import { Link } from "gatsby"
import React, { useState, useEffect }  from "react"
import styled from '@emotion/styled'
import Sidebar from '../components/sidebar'
// import Vmasonry from '../components/vmasonry'
import Masonry from '../components/masonry'
import Cardsection from '../components/cardsection'
import { cardArray } from './cardarray';
import {Container, Row} from './pieces'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

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
            <Masonry />
        </Container>
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