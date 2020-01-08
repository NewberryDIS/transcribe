import React, { Fragment, useState } from 'react'
import Box from './box'
import styled from '@emotion/styled'
import Sidebar from './simplesidebar';

const Boxescss = styled.div`
    width: 100%;
    display: flex;
    align-content: flex-end;
    .boxspacer {
        flex: 1;
    }
    .boxwrapper {
        margin-top: 20vmin;
        position: relative;
        width: 79vw;
        flex-basis: 79vw;
        justify-content: space-evenly;
        display: flex;
        flex-wrap: wrap;
    }
`
const Morebutton = styled.div`
    width: 100%;
    text-align: center;
    .button {
        font-family: sans-serif;
        margin: 25px auto;
        display: inline-block;
        width: initial;
        padding: 12px 15px ;
        border: 1px solid black;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: inset 0 0 10px rgba(0,42,85,1);
        background: rgba(125,159,193,1);
        color: rgba(37,37,37,0.8);
        transition: background 0.5s, color 0.1s;
        &:hover {
            color: rrgba(37,37,37,1);
            background: rgba(143,169,195,1);

        }
    }
`

const Boxes = props => {
    const [showButton, setShowButton] = useState(true);
    const initialBoxes = props.currContent.slice(0,18).map((i, index) => {
        const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
        return <Box key={index} title={i.title} img={img} />
    })
    const [boxes, setBoxes] = useState(initialBoxes);
    function boxer(){
        const qty = 18
        let currLength = boxes === undefined ? 0 : boxes.length
        let boxerContent = currLength >= (props.currContent.length - qty) ? props.currContent.slice(currLength, props.currContent.length) : props.currContent.slice(currLength, currLength + qty)
        let moreBoxes = boxerContent.map((i, index) => {
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
            return <Box key={currLength + index} title={i.title} img={img} />
        })
        currLength = boxes === undefined ? 0 : boxes.length
        return moreBoxes
    }
    return (
            <Boxescss >
                <Sidebar progress={props.progress}/>
                <div className="boxwrapper">
                    {boxes}
                    <Morebutton><div className="button" onClick={() => setBoxes(boxes => ([...boxes, ...boxer()]))}>More</div></Morebutton>
                </div>
            </Boxescss>
    )
}

export default Boxes