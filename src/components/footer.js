import React from 'react'
import styled from '@emotion/styled'
import {colors, fonts } from './styles'
import TwitterContainer from './twittercontainer'
import json from './samplejson.json'
import { useState } from 'react'

const Gardacss = styled.footer`
    width: 90%;
    margin: auto;
    padding: 15px;
    .footerwrapper {
        position: relative;
        width: 70%;
        margin: auto;
        z-index: 0;
        color: rgba(${colors.fg},1);
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        .account {
            grid-column: 1 / -1;
            text-align: center;
        }
        .textycontent {
            box-shadow: inset 0 0 10px rgba(${colors.fg},1);
            background-color: rgba(${colors.bg},1);
            margin: 10px 0;
            grid-column: 1 / 2;
            display: flex;
            flex-wrap: wrap;
            padding: 15px;
            .bg, .contact, .license, .account {
                // background-color: rgba(${colors.bg},1);
                padding: 15px;
            }
            .bg, .tweet {
                flex: 1;
                flex-basis: 200px;
            }
            .contact {
                flex: 2;
            }
            .bg, .contact {
                // &:first-of-type {
                //     margin-right: 0;
                // }
              
            }
            .bg {
                text-align: center;
            }
            figure {
                display: block;
                text-align: center;
                width: 100%;
                margin: auto;
                img, figcaption {
                    margin: auto;
                    font-family: ${fonts.serif};
                }
                img {
                    transition: box-shadow 0.2s;
                    box-shadow: 10px 10px 60px rgba(${colors.fg},0.4);
                }
                a {
                    font-weight: 900;
                    transition: color 0.2s;
                    text-decoration: none;
                    color: rgba(${colors.fg}, 1);
                    transition: color 0.2s;
                    background: inherit;
                    &:hover {
                        // text-shadow: 0 0 10px rgba(${colors.fg},1);
                        color: rgba(${colors.fg}, 0.8);
                        img {
                            box-shadow: 10px 10px 60px rgba(${colors.fg},0.5);
                        }
                    }
                }
            }
            .tweet {
                height: 300px;
            }
            > div {
                padding: 10px;
                margin: 15px;
                border-radius: 6px;
                background: #d0d0d0;
                // border-radius: 50px;
                // background: linear-gradient(145deg, #bbbbbb, #dfdfdf);
                // box-shadow: 30px 30px 60px #e7e7e7, 
                //             -30px -30px 60px #b9b9b9;
                box-shadow: 10px 10px 60px rgba(${colors.fg},0.5);
                
    // box-shadow: inset 0 0 10px rgba(${colors.fg},1);
                // &:first-of-type {
                //     margin-right: 0;
                // }
                // &:last-of-type {
                //     margin-left: 0;
                // }
            }
        } 
    }
    h3 {
        font-family: ${fonts.serif};
    }
    p {
        font-family: ${fonts.sans};
    }
    a {
        font-weight: 900;
        transition: color 0.2s;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
        background-size: 0% 2px;
        background-position: 0% 105%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s, color 0.2s;
        &:hover {
            color: rgba(${colors.fg}, 0.8);
            background-size: 100% 3px;
        }
    }
`
const Tweet = props => {
    return (
        <div className="tweet">
            {props.text}
        </div>
    )
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });
    return await response.json(); 
}
  
const Footer = props => {
    const [imgTitle, setImgTitle] = useState('')
    const tweetcontent = ['tweet one', 'tweet two', 'tweet three']
    const tweets = tweetcontent.map(t => <Tweet key={t} text={t}/>)
    const imgLink = '//iiif.archivelab.org/iiif/' + props.bgId + '$' + props.bgNo + '/full/,200/0/default.jpg'
    const aLink = '//archive.org/details/' + props.bgId + '/mode/1up'
    const dataLink = 'https://cors-anywhere.herokuapp.com/http://archive.org/metadata/' + props.bgId + '/metadata/title'
    postData(dataLink).then((data) => {
        setImgTitle(data.result)
    });
    return (
        <Gardacss >
            <div className="footerwrapper">
                {/* <div className="textycontent">
                    <div className="account"><h3>login &amp; create account etc info</h3></div>
                </div> */}
                <div className="textycontent">
                    {tweets}
                </div>
                <div className="textycontent">
                    <div className="bg"><h3>Background Image</h3><figure><a href={aLink}><img src={imgLink} /><figcaption>{imgTitle}</figcaption></a></figure> </div>
                    <div className="contact"><h3>contact</h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veniam corporis fugiat perferendis porro illum, maiores aliquam soluta similique id praesentium, non quidem doloremque sunt modi. Rem itaque dignissimos cupiditate.</div>
                </div>
                <div className="textycontent">
                <div className="license"><Cccontent /></div>
            </div>
            </div>
        </Gardacss>
    )
}

const Cccontent = () => (
    <p>
        Except where otherwise noted, contextual content on this site is made available under a <a href="https://creativecommons.org/share-your-work/public-domain/cc0/">Creative Commons Public Domain license</a>.  Digitized images and other media from the Newberry's collections are made available for any lawful purpose, commercial or non-commercial, without licensing or permission fees to the library, subject to the following terms and conditions: <a href="https://www.newberry.org/rights-and-reproductions">Newberry Rights and Reproductions Policy.</a>

    </p>
)
export default Footer