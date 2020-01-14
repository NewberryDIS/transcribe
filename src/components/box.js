import React from 'react'
import styled from '@emotion/styled'

var Highlight = require('react-highlighter');

const Boxcss = styled.a`
    box-shadow: inset 0 0 8px rgba(37,37,37,1);
    border: 1px solid black;
    flex-basis: 20vw;
    margin: 10px;
    background: rgba(237,237,237,1);
    .highlight {
        background: yellow;
    }
    &.box {
        .searchtextpanel {
            display: none;
        }
        display: block;
        margin: 1vw;
        position: relative;
        overflow: hidden;
        border: 1px solid #333;
        border-top: 1px solid black;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        background: white;
        font-family: 'Lato', sans-serif;
        height: 20vw;
        width: 20vw;
        img {
            transition: top 0.2s;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: 0;
            z-index: 3;
            position: absolute;
            box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
            height: 20vw;
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
            .boxtext {
                flex: 1;
            }
            h3 {
                margin-bottom: 7px;
            }
        }
        h3 {
            // font-size: 1rem;
            font-size: calc(1vw + 8px);
        }
        p {
            font-size: 0.85rem;
            line-height: 0.85rem;
            padding: 0;
        }
        .boxFooter {
            p, h3 {
                margin: 0;
                margin: 0 0 7px 0;
                padding: 0px 10px;
            }
            height: 13vw;
        }
        &:hover {
            img {
                top: -15vw;
            }
        }
    } 
}    
&.widebox {
    backgorund: green;
}
`
const Box = props => {
    return (
    <Boxcss className={props.boxWidth ? 'box' : 'widebox'} href={props.link}>
        <div className="boxFooter">
            <div className="boxtext">
                <h3>{props.title.length > 70 ? props.title.substring(0,70) + '...' : props.title}</h3>
                <p>{props.text.length > 70 ? props.text.substring(0,70) + '...' : props.text}</p>
            </div>
        </div>
        <div className="searchtextpanel" ><Highlight search={props.textFilter}>{props.script}</Highlight></div>
        <img src={props.img} />
    </Boxcss>
)}

export default Box