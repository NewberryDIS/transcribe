import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './csscomponents'

const Betacss = styled.div`

    position: fixed;
    width: 500px;
    height: 75px;
    background: rgba(${colors.hl},1);
    top: 30px;
    right: -175px;
    text-align: center;
    color: rgba(${colors.bg},1);
    transform:rotate(45deg);
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
        a {
            color: rgba(${colors.bg},1);
            text-decoration: none;
        }
        width: 150px;
        margin: auto;
        font-size: 16px;
        line-height: 20px;
    }
}
`

const BetaBanner = () => {
    return (
        <Betacss>
            <p className="title">B e t a</p>
            <p className="link"><a href="asdfasdf">We want your feedback!</a></p>
        </Betacss>
    )
}

export default BetaBanner
