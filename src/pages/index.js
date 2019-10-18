import { useState } from "react"
import Header from '../components/header'
import Features from '../components/features'
import Body from '../components/body'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import bg from '../images/longpaper.jpg'
import {FontSizes} from '../components/pieces'
import Navbar from "../components/navbar";

const IndexPage = () => {
    const [shrink, setShrink] = useState(false);
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setShrink(true)
            document.getElementById("header").classList.add("small-header");
        } else {
            setShrink(false)
            document.getElementById("header").classList.remove("small-header");
        }
    }
    return (
        
    <div css={css`
        position: relative;
        background-image: url(${bg});
        background-position: 50% 0%;
        background-size: cover;
        background-attachment: fixed;

        .small-header {
            transition: height 0.2s linear !important;
            height: 50px !important;
            z-index: 3;
            & p, h1, h3 {
                font-size: ${FontSizes.md} !important;
            }
            .mainc {
                display: flex !important;
            }
            .otherc, .subheader, img {
                display: none;
            }
            .sometimes-logo {
                display: block;
                max-height: 30px;
                max-width: 30px;
            }
        }
        .hidden {
            display: none;
        }
    `}>
        {shrink ? '' : <Navbar /> }
        <Features />
        <Header />
        <Body />
    </div>

    )
}

export default IndexPage