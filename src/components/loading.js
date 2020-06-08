import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './csscomponents'


const Loadingcss = styled.div`
    width: 100vw;
    overflow: hidden;
    position: fixed;
    top: 50vh;
    left: 0;
    .loading {
        border: 2px solid rgba(${colors.fg},0.7);
        box-shadow: inset 0 0 10px rgba(${colors.hl},0.7);
        text-align: center;
        background: rgba(${colors.bg},1);
        background: repeating-linear-gradient(-45deg, 
            rgba(${colors.hl},0.5),
            rgba(${colors.hl},0.5) 20px, 
            rgba(${colors.bg},1) 20px, 
            rgba(${colors.bg},1) 40px);
        background-size: 400% 400%;
        animation: gradient 22s linear infinite;

        width: 50vw;
        height: 10vh;
        line-height: 10vh;
        font-size: 5vh;
        margin: auto;
    }
    @keyframes gradient {
        0% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    .text {
        border: 2px solid rgba(${colors.fg},0.7);
        font-family: ${fonts.serif};
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},0.75);
        box-shadow: 0 0 10px rgba(${colors.hl},0.7);
        padding: 5px 10px;
        border-radius: 3px;
    }
`

const Loading = props => <Loadingcss><div className="loading"><span className="text">Loading{props.pages ? ' '  + props.pages + ' pages' : ''}...</span></div></Loadingcss>

export default Loading

//<p>Due to a revision, you may have to hard refresh the page, if you encounter errors.  Perform a hard refresh by pressing Ctrl + Shift + R </p>