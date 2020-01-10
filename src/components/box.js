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
`
const Box = props => {
    return (
    <Boxcss className="box" href={props.link}>
        <div className="boxFooter">
            <div className="boxtext">
                <h3>{props.title.length > 70 ? props.title.substring(0,70) + '...' : props.title}</h3>
                <p>{props.text.length > 70 ? props.text.substring(0,70) + '...' : props.text}</p>
            </div>
        </div>
        {console.log(props.filters.textFilter)}
        <div className="searchtextpanel" ><Highlight search={props.filters.textFilter}>{props.script}</Highlight></div>
        <img src={props.img} />
    </Boxcss>
)}

export default Box