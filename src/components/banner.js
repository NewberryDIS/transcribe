import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './csscomponents'

const Betacss = styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 0;
right: 0;
bottom: 0;
left: 0;
.banner {

    position: fixed;
    width: 100%;
    // height: 75px;
    background: rgba(${colors.hl},1);
    top: 25vh;
    // right: -175px;
    text-align: center;
    color: rgba(${colors.bg},1);
    // transform:rotate(45deg);
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    line-height: 25px;
    z-index: 10000;
    text-transform: uppercase;
    font-family: ${fonts.sans};
    .title {
    	padding: 5px 0 0 0;
        font-weight: bold;
        font-size: 20px;
        margin: 0;
    }
    .link {
    	padding: 20px 0;
        a {
            color: rgba(${colors.bg},1);
            text-decoration: none;
        }
        width: 50vw;
        margin: auto;
        font-size: 18px;
        line-height: 20px;
    }
}
}
`

const Banner = () => {
    return (
        <Betacss><div className="banner">

            <p className="link">So sorry &mdash; Newberry Transcribe is out of service for emergency maintenance. Please check back again soon!</p><p className="link">
In the meantime, please help us collect cataloging data for the Newberry's postcard collections at our &nbsp;
                <a href="https://www.zooniverse.org/projects/newberry/postcard-tag"  target="_blank" rel="noopener noreferrer">
                Postcard Tag crowdsourcing site!
                    </a>
                </p>
        </div>
        </Betacss>
    )
}

export default Banner
