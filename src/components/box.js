import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Boxwrapper = styled.div`
    &.mini {
        width: 9vw;
        h3 {
            height: 75%;
            // font-size: 0.8rem;
            font-size: calc(1vw + 4px);
            overflow: hidden;
            text-overflow: ellipsis !important;
        }
        p {
            text-overflow: ellipsis;
            font-size: 0.75rem;
            line-height: 0.75rem;
            padding: 0;
        }
        img {
            height: 13vw;
        }
        .boxFooter {
            height: 6.5vw; 
            * {
                margin: 0;
                padding: 3px;
            }
        }
    }
    &.maxi {
        margin: 1vw;
        width: ${props => props.widthCount};
        h3 {
            // font-size: 1rem;
            font-size: calc(1vw + 8px);
            text-overflow: ellipsis;
        }
        p {
            text-overflow: ellipsis;
            font-size: 0.85rem;
            line-height: 0.85rem;
            padding: 0;
        }
        img {
            height: 20vw;
        }
        .boxFooter {
            height: 8vw; 
            * {
                margin: 0;
                padding: 0px 10px;
            }
        }
        &:hover {
            img {
                top: -9vw;
            }
        }
    }
    height: ${props => props.widthCount};
    position: relative;
    overflow: hidden;
    border: 1px solid #333;
    border-top: 1px solid black;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    background: white;
    font-family: 'Lato', sans-serif;
    img {
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        z-index: 3;
        position: absolute;
        box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
    }
    .boxFooter {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
    }
`

export const Minibox = () => (
    <Boxwrapper className='maxi' />
)

const Box = props => {
    const img = props.image.indexOf('default.jpg') > -1 ? props.image : props.image  + '/full/400,/0/default.jpg'
    return (
        <Boxwrapper className={props.className}>
            <div className="boxFooter">
                <h3>{props.title}</h3>
                <p>{props.text}</p>
                <p>{props.prog}</p>
            </div>
            <img src={img} />
        </Boxwrapper>
    )
}
export default Box