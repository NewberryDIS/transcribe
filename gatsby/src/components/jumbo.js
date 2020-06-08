import React  from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import { colors, fonts } from './csscomponents'

const Jumbocss = styled.div`
    position: relative;
    display: block;
    top: 0;
    z-index: -2;
    .subtitletext {

        z-index: -5;
    }
    .subtitletext .blurtwo {
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
        background: rgba(${colors.bg},0.85);
        text-shadow: 0 0 10px rgba(${colors.fg},0.75);
        opacity: var(--opacity);
        transition: transform .1s linear;
        will-change: opacity;
        font-family: ${fonts.serif};
        position: fixed;
        top: 25vh;
        left: 0;
        right: 0;
        text-align: center;
    }
    .lgtext {
        font-size: 10vmin;
        line-height: 11vmin;
    }
    .mdtext {
        font-size: 7vmin;
        line-height: 5.5vmin;
    }
    .smtext {
        font-size: 4vmin;
        line-height: 4vmin;
        width: 80%;
        margin: auto;
        display: block;
        padding-bottom: 15px;
    }
`
const Jumbo = () => {
    const instance = basicScroll.create({
        from: '0px',
        to: '500px',
        props: {
            '--opacity': {
                from: 0.99,
                to: 0.01
            }
        }
    // }) : ''
    })
    
    instance.start()
    return (
        <Jumbocss id="jumbo">
            <div className="subtitletext"><span className="blurtwo">
                <span className="lgtext">Newberry Transcribe</span><br />
                <span className="mdtext">Unlock the Past!</span><br />
                <span className="smtext">Transcribe letters and diaries to help with historical research</span> 
            </span></div>
        </Jumbocss>
    )
}
export default Jumbo