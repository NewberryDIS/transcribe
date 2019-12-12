import React from 'react'
import Box from './box'
import styled from '@emotion/styled'

const Boxeswrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    float: right;
    // justify-content: space-between;
    // align-content: space-between;
    // margin: 175px auto 0 auto;
    margin-top: ${props => props.top};
    margin-left: 350px;
    // width: calc(100% - 350px);
    width: 70vw;
    .viewmore {
        margin: 15px auto;
        border: 1px solid #333;
        font-family: 'Lato', sans-serif;
        background: #ccc;
        border-radius: 4px;
    }
`

const Boxes = props => {
    let counter = 1
    const currBoxes = props.content.map((i, index) => {
        counter++
        let truncationIndex = i.desc && Math.min(i.desc.indexOf('<'), 150)
        let truncatedDesc = truncationIndex > -1 ? i.desc.substring(0,truncationIndex) + '...' : i.desc
        let littlemode = counter % 5 === 0 || counter % 5 === 1 ? 'mini' : 'maxi'
        return <Box className={littlemode} id={counter} key={index} title={i.title} text={truncatedDesc} image={i.image} prog={i.pc} /> 
    })
    return (
        <Boxeswrapper top={props.topPadder ? '16vh' : '0'}>
            {currBoxes}
            <button className="viewmore">View More</button>
        </Boxeswrapper>
    )
}
export default Boxes