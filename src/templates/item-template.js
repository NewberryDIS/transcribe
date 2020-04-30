import React, { useState } from "react"
import { Global, css } from "@emotion/core"
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { navigate } from "@reach/router"
import Background from '../components/background'
import { colors, fonts } from '../components/csscomponents'
import Footer from '../components/footer'
import Topbar from '../components/topbar'
import { Simpleprogress } from "../components/progress"
import BetaBanner from '../components/beta'
import Progress from '../components/progress'
import transcriptions from '../data/itemTranscriptions.json'
import withLocation from "../components/withlocation"

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
    @media (min-width: 1501px){width: 80%;}
    @media (max-width: 1500px) and (min-width: 901px){width: 95%;}
    @media (max-width: 900px){width: 98%;}
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
        cursor: pointer;
        flex: 1;
        min-width: 300px;
        display: block;
        box-shadow: inset 0 0 10px rgba(${colors.fg},1);
        border: 2px solid rgba(${colors.fg},1);
        padding: 10px;
        margin: 10px;
        transition: all 0.15s;
        &:hover {
            box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
            border: 2px solid rgba(${colors.fg},0.5);

        }
    }
    .pageimage {
        height: 250px;
        border: 2px solid rgba(${colors.fg},1);
        margin: auto;
        display: block;
        box-shadow:  0 0 8px rgba(${colors.fg},1);
    }
    iframe {
        border-radius: 5px;
        width: 100%; 
        height: 80vh;
        overflow: auto;
        box-shadow:  0 0 10px rgba(${colors.fg},1);
    }
    // .sizewarning {
    //     @media (min-width: 500px){display: none;}
    //     @media (max-width: 500px){display: block;}
    // }
`

const Item = ( props ) => {
    const item = props.pageContext
    const [ pageNo, setPageNo ] = useState(props.search.page)
    const pageType = pageNo === undefined ? 'item' : 'page'
    const progress = {
        count: item.count,
        transcount: item.transcount,
        percentTranscribed: item.percentTranscribed,
    }
    const navToPage = (page) => {
        navigate('?page=' + page)
        setPageNo(page)
    }
    let uhh = transcriptions['transcriptions'].find( ({ id }) => id === item.id )
    const pages = uhh.pages.map(i => 
        <a key={i.pageid} className="pagelink" onClick={() => navToPage(i.pageid)}>
            <img className="pageimage" src={'http://publications.newberry.org/transcription/mms-transcribe/files/square_thumbnails/' + i.pagefilename} alt="" />
            <Simpleprogress status={i.transcription ? true : false} />
        </a>
    )
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Newberry Transcribe</title>
            </Helmet>
            <Topbar  />
            <Background image={item.image + '/full/1000,/0/default.jpg'}/>
            <BetaBanner />
            <Itemcss>
                <div className="itemheadertext">
                    { pageType === 'item' ? 
                        <div className="itemheadertext">
                            <h1>{item.title}</h1>
                            <p>{item.desc}</p>
                            {item.cataloglink.length > 0 ? <p><a href={item.cataloglink}  target="_blank" rel="noopener noreferrer">View Catalog Record</a></p> : ''}
                            <Progress progressData={progress} />
                            <div className="pages">
                                {pages}
                            </div>
                        </div>
                        : 
                        <iframe src={`https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/${item.id}/${pageNo}#transcription`} title="transcription page" />
                    }
                </div>
            </Itemcss>
            <Footer />
        </Wrapper>
    )
}

export default withLocation(Item)

{/* <div key={i.pageid} onClick={() => NavToPage(props.pathname, i.pageid, props.setPageType) } className="pagelink" role="navigation" tabIndex={1}>
    <img className="pageimage" src={'http://publications.newberry.org/transcription/mms-transcribe/files/square_thumbnails/' + i.pagefilename} alt="" />
    <Simpleprogress status={i.transcription ? true : false} />
</div> */}