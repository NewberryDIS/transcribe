import React from 'react'
import Box from './box'
import styled from '@emotion/styled'

const tempData = [
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    },
    {
        title: 'number one'
    }
]

const Boxescss = styled.div`
    width: calc(100% - 400px);
    margin-left: 400px;
    // position: absolute;
    // top: -50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-direction: row;
`

const Boxes = props => {
    const boxes = props.currContent.map((i) => {
        const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
        return (
            <Box title={i.title} img={img} />
            )
    })
    return (
        <Boxescss>
            {boxes}
        </Boxescss>
    )
}

export default Boxes