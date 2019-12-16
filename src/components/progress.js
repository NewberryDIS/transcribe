import React, { useState } from 'react'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

const Progress = props => <div className="toHide" css={css`
    transition-delay: 0.3s;
    border: 1px solid black;
    background: white;
    padding: 5px;
    margin: 10px 0;
    background-image:
        linear-gradient(
            to right, 
            rgba(140, 181, 129,0.75),
            rgba(140, 181, 129,0.75) ${Math.round(props.percent)}%,
            #fff ${Math.round(props.percent)}%,
            #fff
        );
    p {
        text-align: center;
        margin-bottom: 3px;
    }
`}>
    <p>
        {numberWithCommas(props.compl)} out of {numberWithCommas(props.total)} pages completed!
    </p>
</div>
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default Progress