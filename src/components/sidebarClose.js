import React, { useState } from 'react'
import styled from '@emotion/styled'
const Closewrapper = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
`

//<Closebutton setShow={setShow} show={show} />
const Closebutton = props => {
    const handleClick = () => {
        console.log('click')
        props.setShow(!props.show)
    }
    return (
    <Closewrapper>
        <div className="button" onClick={() => handleClick()}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    </Closewrapper>
    )
}


// .button {
//     background: white;
//     cursor: pointer;
//     position: absolute;
//     padding: 1px 5px;
//     top: 5vh;
// }
// &.hide {
//     z-index: 3;
//     width: 5px;
//     margin: 0;
//     padding: 0;
//     border: 1px solid black;
//     .toHide {
//         display: none;
//     }
//     .button {
//         z-index: -1;
//         left: 0;
//         border: 1px solid black;
//         border-left: 1px solid transparent;
//     }
//     .bar1, .bar2, .bar3 {
//         width: 30px;
//         height: 5px;
//         background-color: black;
//         margin: 6px 0;
//         transition: 0.4s;
//     }
// }
// &.show {
//     .toHide {
//         display: flex;
//         flex-direction: column;
//     }
//     width: 20vw;
//     z-index: 3;
//     .button {
//         z-index: 4;
//         left: 250px;
//         border: 1px solid transparent;
//     }
//     .bar1, .bar2, .bar3 {
//         width: 35px;
//         height: 5px;
//         background-color: black;
//         margin: 6px 0;
//         transition: 0.4s;
//     }
//     .bar1 {
//         transform: rotate(-45deg) translate(-9px, 6px);
//     }
//     .bar2 {opacity: 0;}
//     .bar3 {
//         transform: rotate(45deg) translate(-8px, -8px);
//     }
// }