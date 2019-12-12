import React from 'react'
import Box from './box'
import img from '../images/featured.jpg'
import styled from '@emotion/styled'

const Cardswrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    // width: 
`

const Cards = () => (
    <Cardswrapper>
        <Box title='a title' text='a short description of the item' image={img} prog={10} />
    </Cardswrapper>
)
export default Cards