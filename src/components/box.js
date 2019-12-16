import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Boxwrapper = styled.a`
    display: block;
    text-decoration: none;
    color: black;
    &.mini {
        // width: 9vw;
        width: ${props => (props.widthCount / 2) - 1}vw;
        h3 {
            flex: 1;
            // font-size: 0.8rem;
            font-size: calc(0.75vw + 6px);
            // overflow: hidden;
        }
        p {
            font-size: 0.75rem;
            line-height: 0.75rem;
        }
        img {
            height: 10vw;
        }
        .boxFooter {
            height: 9.5vw; 
            p, h3 {
                margin: 0 0 7px 0;
                padding: 5px;
            }
        }
    }
    &.maxi {
        margin: 1vw;
        width: ${props => props.widthCount}vw;
        h3 {
            // font-size: 1rem;
            font-size: calc(1vw + 8px);
        }
        p {
            font-size: 0.85rem;
            line-height: 0.85rem;
            padding: 0;
        }
        img {
            height: 20vw;
        }
        .boxFooter {
            height: 14.5vw; 
            p, h3 {
                margin: 0;
                margin: 0 0 7px 0;
                padding: 0px 10px;
            }
        }
        &:hover {
            img {
                top: -15vw;
            }
        }
    }
    height: ${props => props.widthCount}vw;
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
        display: flex;
        flex-direction: column;
        .boxtext{
            flex: 1;
        }
        h3 {
            margin-bottom: 7px;
        }
    }
`

const Progressbar = styled.div`
    background-image:
        linear-gradient(
            to right,
            rgba(140, 181, 129,0.5),
            rgba(140, 181, 129,0.5) ${props => props.prog}%,
            rgba(255,255,255,0.25) ${props => props.prog}%,
            rgba(255,255,255,0.25)
        );
    font-size: 1rem;
    line-height: 1rem;
    height: 1rem;
    width: 85%;
    margin: 5px auto;
    padding: 5px;
    border: 1px solid black;
    text-align: center;
    flex-basis: 30px;
`

const Box = props => {
    const prog = props.prog ? props.prog : 0
    const img = props.image.indexOf('default.jpg') > -1 ? props.image.replace('/full/full/0/default.jpg','/0,0,400,400/400,/0/default.jpg') : props.image  + '/0,0,400,400/400,/0/default.jpg'
    return (
        <Boxwrapper widthCount={props.widthCount} className={props.className} href={props.id}>
            <div className="boxFooter">
                <div className='boxtext'>
                    {console.log('functions are firing')}
                    <h3>{props.title.length > 70 ? props.title.substring(0,70) + '...' : props.title}</h3>
                    <p>{props.text}</p>
                </div>
                <Progressbar prog={prog}>{prog}%</Progressbar>
            </div>
            <img src={img} />
        </Boxwrapper>
    )
}
export const Widebox = props => {
    const prog = props.prog ? props.prog : 0
    const img = props.image.indexOf('default.jpg') > -1 ? props.image.replace('/full/full/0/default.jpg','/0,0,400,400/400,/0/default.jpg') : props.image  + '/0,0,400,400/400,/0/default.jpg'
    return (
        <Wideboxwrapper widthCount={props.widthCount} >
            <img src={img} alt="sample from item" />
            <div className='boxtext'>
                <div className='othertxtbox'>

                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
                <Progressbar prog={prog}>{prog}%</Progressbar>
            </div>
        </Wideboxwrapper>
    )
}

const Wideboxwrapper = styled.a`
    margin: 1vw 0;
    height: ${props => props.widthCount}vw;
    position: relative;
    overflow: hidden;
    border: 1px solid #333;
    border-top: 1px solid black;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    background: white;
    font-family: 'Lato', sans-serif;
    display: block;
    display: flex;
    text-decoration: none;
    color: black;
    width: ${props => (props.widthCount * props.widthCounter) + 8.5}vw;
    // width: 100%;
    img {
        display: inline-block;
        width: ${props => props.widthCount}vw;
        // flex-basis: ${props => props.widthCount}vw;
        margin: 0;
        padding: 0;
    }
    .othertxtbox {
        flex: 1;
    }
    .boxtext {
        display: inline-block;
        flex: 1;
        display: inline-flex;
        flex-direction: column;
        h3, p {
            margin: 0;
            padding: 15px 15px 5px 15px;
        }
    }
`

export default Box