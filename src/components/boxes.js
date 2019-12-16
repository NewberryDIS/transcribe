import React from 'react'
import Box, { Widebox } from './box'
import styled from '@emotion/styled'
import Footer from './footer'
const Boxeswrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    float: right;
    clear: both;
    justify-content: space-evenly;
    align-content: space-evenly;
    // width: 75vw;
    width: ${props => props.width}vw;
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
    height: ${props => props.widthCount}vw;
    // width: 20vw;
    width: ${props => props.widthCount}vw;
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
    let returnCounter = 0
    let storeLittles = []
    let storeWide = []
    const containerWidth = props.widthCount === 20 ? 75 : props.widthCount === 40 ? 60 : 45
    const currBoxes = props.content.map((i, index) => {
        let returnValue = []
        counter++
        let widthCounter = props.widthCount === 20 ? 3 : props.widthCount === 40 ? 2 : 1
        // if we previously stored a wide one, and we've just finished a row, pop the wide one in and then keep going
        if (returnCounter % widthCounter === 0 && storeWide.length > 0) {
            returnValue.push(storeWide.pop())
        }
        // if we're above 5, or if the title length is > 40, or just randonly, it'll be a full size box
        if (counter < 5 || i.title.length > 40 || Math.round(Math.random()) === 1) {
            // if there's html in the desc, lets truncate before that
            let truncationIndex = i.desc && Math.min(i.desc.indexOf('<'), 175)
            // if the truncation index is 175, that means the description is too long, so end it with ...
            // if it's > -1, then there's html, so it should end at a cmoplete sentence, so no ...
            let truncatedDesc = truncationIndex === 175 ? i.desc.substring(0,truncationIndex) + '...' : truncationIndex > -1 ? i.desc.substring(0,truncationIndex) : i.desc
            // if the title is extra long, and randomly, let's make a big big box
            // if (i.title.length > 100 && Math.round(Math.random()) === 1){
            if (i.title.length > 100){
                storeWide.push(<Widebox  id={counter}  widthCounter={widthCounter} widthCount={props.widthCount} key={index} title={i.title} text={truncatedDesc} image={i.image} prog={i.pc} /> )
            } else {
                returnCounter++
                returnValue.push(<Box className='maxi' id={counter}  widthCount={props.widthCount} key={index} title={i.title} text={truncatedDesc} image={i.image} prog={i.pc} /> )
            }
        } else {
            if (storeLittles.length === 2){
                returnCounter++
                returnValue.push(<LittleBoxwrapper widthCount={props.widthCount}>{storeLittles.pop()}<div className="buffer"></div>{storeLittles.pop()}</LittleBoxwrapper>)
            } else {
                storeLittles.push(<Box className='mini' id={counter}  widthCount={props.widthCount} key={index} title={i.title} image={i.image} prog={i.pc} /> )
            }
        }
        return returnValue
    })
    console.log(counter + '. return counter: ' + returnCounter)
    return (
        <Boxeswrapper width={containerWidth} >
            {currBoxes}
            <div className="viewmore"><button>View More</button></div>
        </Boxeswrapper>
    )
}
export default Boxes