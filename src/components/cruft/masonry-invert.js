import React from 'react'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import {itemsJson} from '../data/items.js'
import pic from '../images/img.jpg'
import {Colors} from '../components/pieces'

// const apikey = process.env.GATSBY_OMEKA_API_KEY
// const proxyurl = 'https://cors-anywhere.herokuapp.com/'
// const apiurl = proxyurl + 'https://publications.newberry.org/transcription/mms-transcribe/api/items?key=' + apikey

const MasonryTile = ({ image, alt, title, id, html, index }) => (
    index % 16 === 15 ? 
        <Banner>
            <img src={image} alt={alt} className="masonry-img" />
            <a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + id}>{title.length > 100 ? title.substring(0,75): title}</a><p>{title.length}</p>
        </Banner> 
        :
	    <figure className="masonry-brick" css={css`
            max-width: ${brickWidth(title.length)}px;
        `}><img className="masonry-img" src={image} alt="" />
        <figcaption className="fc"><a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + id}>{title.length > 100 ? title.substring(0,75): title}</a></figcaption>
        <a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + id} className="explore-button">Explore!</a>
	</figure>
);

const Horizicard = styled.div`
    display: flex;
    position: relative;
    flex-flow: row wrap;
    justify-content: space-evenly;
    .masonry-brick {
        border: 1px solid rgba(0,0,0,0.5);
        flex: auto;
        position: relative;
        max-height: 150px;
        min-width: 450px;
        background: ${Colors.fgcolor};
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        border-radius: 2px;
        margin: 5px;
        margin-bottom: 12px;
        font-weight: 700;
        display: flex;
        align-items: flex-start;
        overflow: hidden;
        .masonry-img {
            flex: 1;
        }
        .fc {
            padding: 10px;
            display: block;
            padding: 3px 7px;
            flex: 1;
            float: right;
            width: 40%;
            font-family: 'Hepta Slab', serif;
            font-size: 0.7rem;
            background: ${Colors.fgcolor};
        }
    }
    .explore-button, .fc {
        &:hover {
            box-shadow: 0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        }
    }

    .explore-button, .fc a {
        padding: 3px 7px;
        text-decoration: none;
        color: ${Colors.bgcolor};
    }
    .explore-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: ${Colors.fgcolor};
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        border-radius: 2px;
        cursor: pointer;
    }
`
const Banner = styled.div`
    width: 100%;
    color: ${Colors.bgcolor};
    background: ${Colors.fgcolor};
    border: 1px solid transparent;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    border-radius: 2px;
    z-index: 2;
    margin: 20px;
    padding: 20px;
    & a { 
        color: ${Colors.bgcolor};
        text-decoration: none;
    }
`

function brickWidth(length) {const width = (length * 2) + 300 > 350 ? 350 : (length * 2) + 300; return( width)}
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
                return (<MasonryTile image={pic} index={i} key={i} alt="Masonry Brick #1" title={coll.element_texts[0].text} html={html} id={coll.id} />)})
        return (
            <Horizicard>
                {cards}
            </Horizicard>
        )
    }
}

export default Masonry