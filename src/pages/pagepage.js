import React, { useState, useEffect } from "react"
// import React, { useState, useEffect, useRef } from "react"
// import ReactDOM from 'react-dom' 
import { Global, css } from "@emotion/core"
import styled from '@emotion/styled'
import Background from '../components/background'
import { colors } from '../components/csscomponents'
import Footer from '../components/footer'
import Topbar from '../components/topbar'
import Banner from '../components/banner'
import { useParams} from 'react-router-dom'


const Wrapper = styled.div`
position: relative;
margin: 0;
padding: 0;
z-index: 1;
display: flex;
flex-direction: column;
min-height: 100vh;
`
const FooterTwo = Wrapper
// const Itemcss = styled.div`
//     @media (min-width: 1501px){width: 80%;}
//     @media (max-width: 1500px) and (min-width: 901px){width: 95%;}
//     @media (max-width: 900px){width: 98%;}
//     background: rgba(${colors.bg});
//     color: rgba(${colors.fg});
//     box-shadow: inset 0 0 10px rgba(${colors.fg},1);
//     margin: 80px auto;
//     padding: 2vw;
//     font-family: ${fonts.sans};
//     border: 2px solid rgba(${colors.fg},0.7);
//     h1, h3 {
//         font-family: ${fonts.serif};
//         margin: 12px 0;
//     }
//     h3 {
//         font-size: 1.5rem;
//     }
//     ul {
//         li {
//             padding: 5px 0;
//         }
//     }
//     p { 
//         margin-bottom: 12px;
//     }
//     a {
//         font-weight: 900;
//         text-decoration: none;
//         color: rgba(${colors.fg}, 1);
//         background-image: linear-gradient(transparent 1px, rgba(${colors.hl},1) 1px);
//         background-size: 0% 1px;
//         background-position: 0% 101%;
//         background-repeat: no-repeat;
//         transition: background-size 0.2s ease 0s;
//         &:hover {
//             background-size: 100% 2px;
//         }
        
//     }
//     .itemheaderimage {
//         padding: 10px 20px;
//         float: left;
//     }
//     &::after {
//         content: "";
//         clear: both;
//         display: table;
//     }
//     .pages {
//         display: flex;
//         flex-wrap: wrap;
//     }
//     .pagelink {
//         cursor: pointer;
//         flex: 1;
//         min-width: 300px;
//         display: block;
//         box-shadow: inset 0 0 10px rgba(${colors.fg},1);
//         border: 2px solid rgba(${colors.fg},1);
//         padding: 10px;
//         margin: 10px;
//         transition: all 0.15s;
//         &:hover {
//             box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
//             border: 2px solid rgba(${colors.fg},0.5);

//         }
//     }
//     .pageimage {
//         height: 250px;
//         border: 2px solid rgba(${colors.fg},1);
//         margin: auto;
//         display: block;
//         box-shadow:  0 0 8px rgba(${colors.fg},1);
//     }

//     // .sizewarning {
//     //     @media (min-width: 500px){display: none;}
//     //     @media (max-width: 500px){display: block;}
//     // }
// `

const PagePage = () => {
    const { itemid, pageid } = useParams()
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <Wrapper >
            <Global styles={css`
                html, body {
                    margin: 0;
                    padding: 0;
                    position: relative;
                    z-index: 1;
                    -webkit-font-smoothing: antialiased;
                }
                .iframeContainer {
                    padding: 30px 100px;
                    width: 90%;
                    height: 1400px;
                    margin: 60px auto;
                    z-index: 0;
                    background: rgba(${colors.bg},1);
                    border: 2px solid rgba(${colors.fg},1);
                    box-shadow: inset 0 0 10px rgba(${colors.hl},0.5);
            
                }
                iframe {
                    width: 1000px;
                    height: 100%;
                    z-index: 100;
                    border-radius: 5px;
                    width: 100%; 
                    margin: auto;
                    overflow: auto;
                    background: rgba(${colors.bg},1);
                    border: 2px solid rgba(${colors.fg},1);
                    box-shadow: 0 0 10px rgba(${colors.hl},0.5);
                }
            `}/>
            <Topbar  />
            <Background />
            <div className="iframeContainer">
                {loading? '' : <iframe src={`https://digital.newberry.org/transcribe/omeka/scripto/transcribe/${itemid}/${pageid}#transcription`} placeholder={"Loading..."} title="transcription page"  /> }
            </div>
            <Footer />
        </Wrapper>
    )
}

export default PagePage
