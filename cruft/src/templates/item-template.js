import React, { useState } from "react"
import Background from '../components/background'
import { Global, css } from "@emotion/core"
import styled from '@emotion/styled'
import { graphql } from "gatsby"
import { colors, fonts } from '../components/styles'
import Footer from '../components/footer'
import Topbar from '../components/topbar'
import { Indexcss } from '../pages/index.js'
import { Simpleprogress } from "../components/progressbar"




const Itemcss = styled.div`
    width: 60%;
    background: rgba(${colors.bg});
    color: rgba(${colors.fg});
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    margin: 80px auto;
    padding: 2vw 5vw;
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
    a {
        font-weight: 900;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        
    }
    .itemheaderimage {
        padding: 10px;
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
        display: block;
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        border: 2px solid rgba(${colors.fg},1);
        padding: 10px;
        margin: 10px;
    }
    .pageimage {
        border: 2px solid rgba(${colors.fg},1);
        margin: auto;
        display: block;
    }
`


export default ( props ) => {
    console.log(props.pageContext)
    const item = props.pageContext
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()
    const pages = item.pages.map(i => 
        <a href={`https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/${item.id}/${i.pageid}#transcription`} className="pagelink">
            <img className="pageimage" src={'http://publications.newberry.org/transcription/mms-transcribe/files/square_thumbnails/' + i.pagefilename} />
            {console.log(i)}
            <Simpleprogress status={i.transcription ? true : false} />
        </a>
    )
    return (
        <Indexcss >
        <Global styles={css`
            html, body {
                margin: 0;
                padding: 0;
                position: relative;
                z-index: 1;
            }
        `}/>
        <Topbar  />
        <Background setBgId={setBgId} setBgNo={setBgNo} />
            <Itemcss>
                <div className="itemheaderimage">
                    <img src={item.image + '/full/400,/0/default.jpg'} />
                </div>
                <div className="itemheadertext">
                    
                    <h1>{item.title}</h1>
                    <p>{item.desc}</p>
                    <div className="pages">
                        {pages}
                    </div>
                </div>
            </Itemcss>
            <Footer bgId={bgId} bgNo={bgNo}/>
        </Indexcss>
    )
}
// export const query = graphql`
//   {
//     sitePage {
//       context {
//         id
//         title
//         transcount
//       }
//     }
//   }
// `
