/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import {Container, Row, Flexbox, FontSizes, Colors } from './pieces'
import Hand from '../images/hand.png'
import logob from '../images/Newberry_N.svg';


const headercss = css`
    transition: 0.2s linear;
    font-family: 'News Cycle', sans-serif;
    // background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
    background: ${Colors.bgcolor};
    box-shadow: 0 20px 20px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    color: ${Colors.fgcolor};
    font-family: sans-serif;
    position: sticky;
    top: 0;
    height: 200px;
    & img {
        margin: 0; 
        flex-basis: 150px;
        max-width: 121px;
        max-height: 121px;
        width: auto;
        height: auto;
        // filter: invert(1);
        @media (max-width: 900px ){
            // margin: 0 0 15px 0;
        }
    } 
    & a {
        color: ${Colors.fgcolor};
        text-decoration: none;
        background-image: linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75));
        background-position: 0% 105%;
        background-repeat: no-repeat;
        background-size: 0% 2px;
        transition: background-size .2s;
        
        &:hover {
            background-size: 100% 2px;
        }
    }
    & h1, h3, p {
        color: ${Colors.fgcolor}
        margin: 2px;
    }
    & .subheader {
        font-style: italic;
        line-height: ${FontSizes.lg};
    }
    & h1 {
        transition: 0.2s;
        font-size: ${FontSizes.xl};
    }
    & h3 { 
        font-size: ${FontSizes.md};
    }
    & .subheader {
        font-size: ${FontSizes.lg};
    }
    & p {
        font-size: ${FontSizes.sm};
    }
    & .mainc, .otherc {
        margin: 0 15px;

    }
    .otherc {
        @media (max-width: 900px){
            display: none;
        }
    }
    .hidey {
        display: none;
        @media (max-width: 900px){
            display: block;
            font-size: ${FontSizes.md};
        }
    }
    .sometimes-logo {
        postiion: absolute;
        left: 0;
        display: none;
        filter: invert(${Colors.inversion});
    }
`


const Header = () => {

return (

    <header id="header" css={headercss}>
        <Container >
            <a href="http://www.newberry.org" ><img className="sometimes-logo" src={ logob } alt="Newberry Logo"/></a>
            <Row >
                <Flexbox flex={1.2}>
                    <Flexbox column className="mainc" >
                        <h1>Newberry Transcribe</h1>
                        <p className="subheader">Uncover everyday life in the 19th &amp; early 20th centuries</p>
                        <p className="hidey">Contribute <a href="http://www.google.com">here</a>!</p>
                    </Flexbox>
                    <Flexbox column css={css`justify-content: center; align-items: center;`}>
                        <img src={Hand} alt="A hand holding a pencil over paper." />
                    </Flexbox>
                </Flexbox>
                <Flexbox flex={1} column className="otherc">
                    <h3>Volunteeer online to make historic records easier to find and search</h3>
                    <p className="right-lowertext">Your efforts transcribing hadwritten letters &amp; diaries will help improve access to our shared cultural heritage.</p>
                    <p className="right-lowertext">Learn more <a href="http://www.google.com">here</a> or simply choose a collection below to get started &ndash; no account needed!</p>
                </Flexbox>
            </Row>
        </Container>
    </header>
)

}

export default Header
