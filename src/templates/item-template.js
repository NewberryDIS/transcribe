import React, { useState } from "react"
import { Global, css } from "@emotion/core"
import styled from '@emotion/styled'
// import { graphql } from "gatsby"
import Background from '../components/background'
import { colors, fonts } from '../components/csscomponents'
import Footer from '../components/footer'
import Topbar from '../components/topbar'
import { Simpleprogress } from "../components/progress"
import BetaBanner from '../components/beta'
import Progress from '../components/progress'

const Wrapper = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`


const Itemcss = styled.div`
    width: 60%;
    background: rgba(${colors.bg});
    color: rgba(${colors.fg});
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    margin: 80px auto;
    padding: 2vw;
    font-family: ${fonts.sans};
    border: 2px solid rgba(${colors.fg},0.7);
    h1, h3 {
        font-family: ${fonts.serif};
        margin: 12px 0;
    }
    h3 {
        font-size: 1.5rem;
    }
    ul {
        li {
            padding: 5px 0;
        }
    }
    p { 
        margin-bottom: 12px;
    }
    a {
        font-weight: 900;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        background-image: linear-gradient(transparent 1px, rgba(${colors.hl},1) 1px);
        background-size: 0% 1px;
        background-position: 0% 101%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s;
        &:hover {
            background-size: 100% 2px;
        }
        
    }
    .itemheaderimage {
        padding: 10px 20px;
        float: left;
    }
    &::after {
        content: "";
        clear: both;
        display: table;
    }
    .pages {
        display: flex;
        flex-wrap: wrap;
    }
    .pagelink {
        flex: 1;
        min-width: 300px;
        display: block;
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        border: 2px solid rgba(${colors.fg},1);
        padding: 10px;
        margin: 10px;
    }
    .pageimage {
        height: 250px;
        border: 2px solid rgba(${colors.fg},1);
        margin: auto;
        display: block;

        box-shadow:  0 0 8px rgba(${colors.fg},1);
    }
`


export default ( props ) => {
    console.log(props.pageContext)
    const item = props.pageContext
    const pages = item.pages.map(i => 
        <a href={`https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/${item.id}/${i.pageid}#transcription`} className="pagelink">
            <img className="pageimage" src={'http://publications.newberry.org/transcription/mms-transcribe/files/square_thumbnails/' + i.pagefilename} />
            <Simpleprogress status={i.transcription ? true : false} />
        </a>
    )
    const progress = {
        count: item.count,
        transcount: item.transcount,
        percentTranscribed: item.percentTranscribed,
    }
    return (
        <Wrapper >
        <Global styles={css`
            html, body {
                margin: 0;
                padding: 0;
                position: relative;
                z-index: 1;
            }
        `}/>
        <Topbar  />
        <Background image={item.image + '/full/1000,/0/default.jpg'}/>
        <BetaBanner />
            <Itemcss>
                <div className="itemheadertext">
                    
                    <h1>{item.title}</h1>
                    <p>{item.desc}</p>
                    <p><a href={item.cataloglink}>View Catalog Record</a></p>
                    <Progress progressData={progress} />
                    <div className="pages">
                        {pages}
                    </div>
                </div>
            </Itemcss>
            <Footer />
        </Wrapper>
    )
}