import React from 'react'
import Box from './box'
import Widebox from './widebox'
import styled from '@emotion/styled'
import bg1 from '../images/lgbg1.jpg'
import bg2 from '../images/lgbg2.jpg'
import bg3 from '../images/lgbg3.jpg'
import bg4 from '../images/lgbg4.jpg'
import bg5 from '../images/lgbg5.jpg'
import bg6 from '../images/lgbg6.jpg'
import bg7 from '../images/lgbg7.jpg'


const Boxescss = styled.div`
width: 100vw;
margin-top: 200px;
overflow: hidden;
`
const Sixpack = styled.div`
        width: calc(100% - 20vw);
        margin-left: 400px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        flex-direction: row;
        background: url(${props => props.bg});
        background-attachment: fixed;
        background-size: cover;
`

const Boxes = props => {
    let boxcounter = 0
    let sixpack = []
    const bgarray = [
        bg1,
        bg2,
        bg3,
        bg4,
        bg5,
        bg6,
        bg7,
        bg1,
        bg2,
        bg3,
        bg4,
        bg5,
        bg6
    ]
    const boxes = props.currContent.map((i, index) => {
        boxcounter++
        const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
        const returnbox = []
        // console.log(index)
        let twelvepack = sixpack.length
        let rand = Math.round(Math.random() * 12)
        console.log(boxcounter + ': ' + twelvepack + ': ' + bgarray[twelvepack])
        if (twelvepack === 12) { 
            returnbox.push( <Sixpack bg={bgarray[rand]} key={index}>{sixpack}</Sixpack> )
            sixpack = []
            // console.log('six pack is 12 so we\'re returning the sixpack, and now sixpack is ' + sixpack.length)
        } else if (boxcounter % 12 === 1 && index > 12) {
            // console.log('six pack is 0 so we\'re popping a wide one, also index is ' + index )
            returnbox.push(<Widebox key={index} title={i.title} img={img} /> )
        } else {
            // console.log('six pack is ' + sixpack.length)
            sixpack.push(<Box key={index} title={i.title} img={img} />)
        }
        return returnbox
    })
    return (
        <Boxescss className="scrollanchor">
            <div className="boxwrapper">

            {boxes}
            </div>
        </Boxescss>
    )
}

export default Boxes