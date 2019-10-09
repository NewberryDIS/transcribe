import React from 'react'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import {itemsJson} from '../data/items.js'

import pic from '../images/img.jpg'

// const apikey = process.env.GATSBY_OMEKA_API_KEY
// const proxyurl = 'https://cors-anywhere.herokuapp.com/'
// const apiurl = proxyurl + 'https://publications.newberry.org/transcription/mms-transcribe/api/items?key=' + apikey

const MasonryTile = ({ image, alt, title, id, html }) => (
	<figure className="masonry-brick" css={css`
            width: ${brickWidth(title.length)}px;
            img {width: ${imgWidth(title.length)}px;}
        `}>
        <img src={image} alt={alt} className="masonry-img" />
        <figcaption className="fc"><a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + id}>{title}</a><p>{title.length}</p></figcaption>
	</figure>
	
);
function brickWidth(length) {const width = (length * 2) + 300 > 450 ? 450 : (length * 2) + 300; return( width)}
function imgWidth(length) {const width = (length * 2) + 125 > 350 ? 350 : (length * 2) + 125 ; return( width)}
class Masonry extends React.Component {
    // state = {
    //     collections: [itemsJson]
    // }
    // componentDidMount() {
    //     fetch(apiurl)
    //     .then(res => res.json())
    //     .then((data) => {
    //         this.setState({ collections: data })
    //         console.log(data)
    //     })
    //     .catch(console.log)
    // }
    render() {
        const cards = itemsJson
            .slice(0, 100)
            .map((coll, i) => {
                const html = []; 
                for (const v in coll.element_texts) {html.push( coll.element_texts[v].html ? coll.element_texts[v].text.substring(0,60) + '...' : '')}
                return (<MasonryTile image={pic} key={i} alt="Masonry Brick #1" title={coll.element_texts[0].text} html={html} id={coll.id} />)})
        return (
            <div className="masonry" css={css`
                display: flex;
                flex-flow: row wrap;
                justify-content: space-evenly;
                .masonry-brick {
                    {/* flex: auto; */}
                    height: 250px;
                    min-width: 150px;
                    position: relative;
                    display: flex;
                    margin: 20px;
                    -webkit-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
                    box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
                    border-radius: 6px;
                    border: 1px solid black;
                }
                .masonry-img {
                    border-radius: 6px;
                    object-fit: cover;
                    height: 100%;
                }
                img {
                    vertical-align: middle;
                    border-radius: 6px;
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                }
                .fc {
                    flex: 1;
                    font-family: 'Hepta Slab', serif;
                    font-size: 0.7rem;
                    background: white;
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;
                    a { 
                        font-size: 0.95rem;
                        text-decoration: none;
                        color: black;
                        &:hover{ 
                            text-decoration: underline;
                        }
                    }
                    padding: 10px;
                    font-weight: 700;
                }
               
            `}>
                {cards}
        </div>
        )
    }
}



export default Masonry