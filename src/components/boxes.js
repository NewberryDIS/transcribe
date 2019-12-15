import React from 'react'
import Box, { Minibox } from './box'
import styled from '@emotion/styled'

const Boxeswrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    float: right;
    clear: both;
    justify-content: space-evenly;
    align-content: space-evenly;
    width: 75vw;
    margin-bottom: 60px;
    .viewmore {
        position: absolute;
        bottom: -60px;
        left: 0;
        right: 0;
        width: 100%;
        button {
            display: block;
            margin: 15px auto;
            border: 1px solid #333;
            font-family: 'Lato', sans-serif;
            background: #ccc;
            border-radius: 4px;
        }
    }
`

const LittleBoxwrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    margin: 1vw;
    height: ${props => props.widthCount};
    // width: 20vw;
    width: ${props => props.widthCount};
    // height: 20vw;
    position: relative;
    // border: 1px solid #333;
    .buffer {
        width: 1.8vw;
        height: 100%;
    }
`

const Boxes = props => {
    let counter = 1
    let storeIt = []
    const currBoxes = props.content.map((i, index) => {
        counter++
        if (counter < 5 || i.title.length > 40 || Math.round(Math.random()) === 1) {
            let truncationIndex = i.desc && Math.min(i.desc.indexOf('<'), 150)
            let truncatedDesc = truncationIndex > -1 ? i.desc.substring(0,truncationIndex) + '...' : i.desc
            return  <Box className='maxi' id={counter} key={index} title={i.title} text={truncatedDesc} image={i.image} prog={i.pc} /> 
        } else {
            if (storeIt.length === 2){
                return <LittleBoxwrapper>{storeIt.pop()}<div className="buffer"></div>{storeIt.pop()}</LittleBoxwrapper>
            } else {
                storeIt.push(<Box className='mini' id={counter} key={index} title={i.title} image={i.image} prog={i.pc} /> )
            }
        }
    })
    return (
        <Boxeswrapper >
            {currBoxes}
            <div className="viewmore"><button>View More</button></div>
        </Boxeswrapper>
    )
}
export default Boxes