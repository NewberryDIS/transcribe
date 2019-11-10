import React from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import styled from "@emotion/styled";
import { Link } from "gatsby"
import parse from 'html-react-parser';
// images

let breakPoints = [400, 700, 850, 1400];

const Masonrycontainer = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    text-align: center;
    padding: 4px;
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
    flex-basis: 350px;
    // min-width: 300px;
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

export default class Cardsection extends React.Component {
    render() {
        let itemsArray = []
        Object.keys(this.props.items).map((i) =>{
            itemsArray.push(this.props.items[i])
        })
        itemsArray.sort((a, b) => a.weight - b.weight)
        // console.log(itemsArray.length)
        let cards = itemsArray.map((i) => {
            let link = 'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + i.id
            let truncIndex = i.desc && Math.min(i.desc.indexOf('<'), 150)
            let truncatedDesc = truncIndex > -1 ? i.desc.substring(0,truncIndex) + '...' : i.desc
            let imagePath = i.image && i.image.lastIndexOf('/') > -1 ? i.image.substring(i.image.lastIndexOf('/')) : false
            let image = !imagePath ? 'No Image Found.' : require('../images/thumbs' + imagePath)
            return (
                <Card key={i.id} weight={i.weight} link={link} image={image} title={i.title} desc={truncatedDesc} prog={i.pc} />
            )
        })
        return (
            <Masonrycontainer>
                        <Masonry breakPoints={breakPoints}>
                            {cards}
                            
                        </Masonry>
                </Masonrycontainer>
        )
    }
}


const Card = props => {
    return (
        <Cardwrapper className="card" >
            <div className="cardbg" css={css`background-image: url('${props.image}');`} />
            <div className="cardcap">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            </div>
            <div className="cardText">
                <h3 className="cardtitle">
                    {props.title}
                </h3>
                <p className="carddesc">
                    {props.weight}
                </p>
                <p className="carddesc">
                    {props.desc}
                </p>
                <div className="cardprogress" css={css`
                    background-image:
                        linear-gradient(
                            to right,
                            rgba(140, 181, 129,0.5),
                            rgba(140, 181, 129,0.5) ${Math.round(props.prog,0)}%,
                            rgba(255,255,255,0.25) ${Math.round(props.prog,0)}%,
                            rgba(255,255,255,0.25)
                        );`}>{Math.round(props.prog,0)}%</div>
            </div>
        </Cardwrapper>
    )
}


const Cardwrapper = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-evenly;
    &.card {
        flex-basis: 350px;
        flex-direction: column;
        position: relative;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 3px;
        flex: auto;
        padding: 0;
        margin: 10px;
        max-width: 300px;
        background-color: white;
        text-align: initial;
        overflow: hidden;
        > * {
            color: black;
        }
    }
    .cardbg {
        z-index: 0;
        width: calc(100% + 80px);
        background-position: center;
        background-size: cover;
        position: absolute;
        left: -40px;
        right: -40px;
        top: -40px;
        bottom: -40px;
    }
    .cardText {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
        flex: 1;
        // overflow: auto;
        box-shadow: 
            0px 11px 8px -10px  rgba(0,0,0,0.4),
            0px -11px 8px -10px rgba(0,0,0,0.4); 
        height: calc(100% - 250px);
        padding: 20px;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.5); 
    }
    .cardcap {
        flex: 1;
        img {
            height: 250px;
        }
    }
    .cardtitle, .carddesc {
        flex: 1;
    }
    .cardprogress {
        width: 100%;
        margin: auto;
        padding: 5px;
        border: 1px solid black;
        text-align: center;
        flex-basis: 40px;
    }
`