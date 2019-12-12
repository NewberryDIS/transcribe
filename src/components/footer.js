import React from 'react'
import styled from '@emotion/styled';

const Footerwrapper = styled.div`margin: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 100;
    z-index: 6;
    & a {
        color: black;
        font-weight: 900;
        text-decoration: none;
        background-image: linear-gradient(to bottom, transparent 1px, black 2px); 
        background-position: 0% 105%;
        background-repeat: no-repeat;
        background-size: 0% 2px;
        transition: background-size .2s;
        &:hover {
            &.smlink {
                background-size: 100% 2px;
            }
            &.lglink {
                background-size: 100% 4px;
            }
        }
    }
    padding: 15px 30px;
    border-radius: 6px; 
    margin: 0;
    &.middle, &.right, &.left p {
        font-size: 0.65rem;
    }
    .left {
        flex: 1;
    }
    .middle {
        flex: 2;
    }
    .right {
        flex: 2;
    }
    .emphasis {
        color: black;
        font-weight: 900;
    }
    background: white;
    box-shadow: inset 0 0 10px #000000;
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const Footer = () => (
    <Footerwrapper>
        <div className="left"><a href="">O Hello</a></div>
        <div className="middle">O Hello</div>
        <div className="right"><a href="">O Hello</a></div>
    </Footerwrapper>
)
export default Footer