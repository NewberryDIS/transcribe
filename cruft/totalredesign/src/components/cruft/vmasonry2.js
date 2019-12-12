import React from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import styled from "@emotion/styled";
import pic from '../images/img.jpg'

const apikey = process.env.GATSBY_OMEKA_API_KEY
const apiurl = 'https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/items?key=' + apikey

let breakPoints = [350, 500, 750];
const Masonrycontainer = styled.div`
    width: 80%;
    margin: auto;
    padding: 4px;
    color: #efefef;
`
const Masonrycss = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: stretch;
    width: 100%;
    margin: auto;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: stretch;
    flex: auto;
`
class Masonry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { columns: 1 };
        this.onResize = this.onResize.bind(this);
    }
    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    getColumns(w) {
        return breakPoints.reduceRight((p, c, i) => {
            return c < w ? p : i;
        }, breakPoints.length) + 1;
    }
    onResize() {
        const columns = this.getColumns(this.refs.Masonry.offsetWidth);
        if (columns !== this.state.columns) {
            this.setState({ columns: columns });
        }
    }
    mapChildren() {
        let col = [];
        const numC = this.state.columns;
        for (let i = 0; i < numC; i++) {
            col.push([]);
        }
        return this.props.children.reduce((p, c, i) => {
            p[i % numC].push(c);
            return p;
        }, col);
    }
    render() {
        return (
        <Masonrycss className="masonry" ref="Masonry">
            {this.mapChildren().map((col, ci) => 
                <Column className="column" key={ci}>
                    {col.map((child, i) => 
                        <div key={i}>{child}</div>
                    )}              
                </Column>
                )}
        </Masonrycss>
        )
    }
}


const Tile = ({ image, alt, title, id, html }) => <div css={css`
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
    .masonry-brick {
        position: relative;
        display: flex;
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
    <figure className="masonry-brick" >
        <img src={image} alt={alt} className="masonry-img" />
        <figcaption className="fc"><a href={'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + id}>{title}</a><p>{title.length}</p></figcaption>
	</figure>
</div>


export default class Vmasonry extends React.Component {
    state = {
        collections: []
    }
    componentDidMount() {
        fetch(apiurl)
        .then(res => res.json())
        .then((data) => {
            this.setState({ collections: data })
        })
        .catch(console.log)
    }
    render() {
        const cards = this.state.collections
            .slice(0, 100)
            .map((coll, i) => {
                const html = []; 
                for (const v in coll.element_texts) {html.push( coll.element_texts[v].html ? coll.element_texts[v].text.substring(0,60) + '...' : '')}
                return (<Tile image={pic} key={i} alt="Masonry Brick #1" title={coll.element_texts[0].text} html={html} id={coll.id} />)})
        return ( <div>
                <Masonrycontainer>
                    <Masonry breakPoints={breakPoints}>
                        {cards}
                    </Masonry>
                </Masonrycontainer>
            </div>
        )
    }
}