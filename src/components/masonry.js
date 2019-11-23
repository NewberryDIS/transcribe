import React from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import styled from "@emotion/styled";
import { Link } from "gatsby"
// images
import a from '../images/1.jpg'
import b from '../images/2.jpg'
import c from '../images/3.jpg'
import d from '../images/4.jpg'
import e from '../images/5.jpg'
import f from '../images/6.jpg'
import g from '../images/7.jpg'
import h from '../images/8.jpg'
import i from '../images/9.jpg'
import j from '../images/10.jpg'
import k from '../images/11.jpg'
import l from '../images/12.jpg'
import m from '../images/13.jpg'
import n from '../images/14.jpg'
import o from '../images/15.jpg'
import p from '../images/16.jpg'
import q from '../images/17.jpg'
import r from '../images/18.jpg'
const images = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r]

let breakPoints = [400, 700, 850, 1400];

const Masonrycontainer = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    text-align: center;
    padding: 4px;
    z-index: 2;
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
        Object.keys(this.props.items).slice(0,20).map((i) =>{
            itemsArray.push(this.props.items[i])
        })
        itemsArray.sort((a, b) => a.weight - b.weight)
        // let cards = itemsArray.map((i) => {
        //     let link = 'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + i.id
        //     // if there is a description, if there's html in it ("<"), then only use the substring up until the first <, or 150 characters, whichever is lower; 
        //     // if there's no html in it, and the lngth is more than 150, then only use the first 150 characters
        //     // otherwise, use the entire description
        //     let truncatedDesc = i.desc ? 
        //             i.desc.indexOf('<') > -1 ? 
        //                 i.desc.substring(0, Math.min(i.desc.indexOf('<'), 150)) + '...' 
        //             : i.desc.length > 150 ? 
        //                     i.desc.substring(0,150) + '...' 
        //                 : i.desc 
        //         : ''
        //     let imagePath = i.image && i.image.lastIndexOf('/') > -1 || i.image && i.image.indexOf('.html') === -1 ? i.image.substring(i.image.lastIndexOf('/')) : false
        //     let randImg = images[(Math.floor((Math.random() * 17) + 1))]
        //     let image = !imagePath ?  randImg : require('../images/thumbs' + imagePath)
        //     // let image = !imagePath ?  require('../images/thumbs/smile.jpg') : require('../images/thumbs' + imagePath)
        //     // let image = !imagePath ?  'No Image Found' : require('../images/thumbs' + imagePath)
        //     return (
        //         <Card key={i.id} weight={i.weight} link={link} image={image} title={i.title} desc={truncatedDesc} prog={i.pc} />
        //     )
        // })
        return (
            <Masonrycontainer>
                <Masonry breakPoints={breakPoints}>
                    {itemsArray.map(i => {
                        let link = 'https://publications.newberry.org/transcription/mms-transcribe/items/show/' + i.id
                        // if there is a description, if there's html in it ("<"), then only use the substring up until the first <, or 150 characters, whichever is lower; 
                        // if there's no html in it, and the lngth is more than 150, then only use the first 150 characters
                        // otherwise, use the entire description
                        let truncatedDesc = i.desc ? 
                                i.desc.indexOf('<') > -1 ? 
                                    i.desc.substring(0, Math.min(i.desc.indexOf('<'), 150)) + '...' 
                                : i.desc.length > 150 ? 
                                        i.desc.substring(0,150) + '...' 
                                    : i.desc 
                            : ''
                        let imagePath = i.image && (i.image.lastIndexOf('/') > -1 || i.image && i.image.indexOf('.html') === -1) ? i.image.substring(i.image.lastIndexOf('/')) : false
                        let randImg = images[(Math.floor((Math.random() * 17) + 1))]
                        let image = !imagePath ?  randImg : require('../images/thumbs' + imagePath)
                        return ( <Card key={i.id} id={i.id} weight={i.weight} link={link} image={image} title={i.title} desc={truncatedDesc} prog={i.pc} /> )
                    }).filter(i => {
                        console.log('text filter = ' + this.props.filters.titleFilter)
                        return this.props.filters.titleFilter.length > 0  ? i.title.toLowerCase().indexOf(this.props.filters.titleFilter) > -1 : true
                    }).filter(i => {
                        // if item's bottom date is below the filter's top date, and the item's top date is below the filter's bottom date, then show
                        return this.props.filters.dateFilter && i.date ? i.date[0] <= this.props.filters.dateFilter[1] && i.date[i.date.length - 1] >= this.props.filters.dateFilter[0] : true
                    }).filter(i => {
                        return this.props.filters.subjectFilter.length > 0 && i.subject ? i.subject.indexOf(this.props.filter.subjectFilter) > -1 : true
                    // transcript filter: 
                    // }).filter(i => {
                    //    return Filter ? i.props... : true
                    })
                    }
                            
                </Masonry>
            </Masonrycontainer>
        )
    }
}


const Card = props => {
    return (
        <Cardwrapper href={props.id} className="card" >
            <div className="cardbg" css={css`background-image: url('${props.image}');`} />
            <div className="cardcap">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            </div>
            <div className="cardText">
                <h3 className="cardtitle">
                    {props.title}
                </h3>
                <p className="carddesc">
                    {props.tl}
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
                <div className="" href={props.id} css={css`
                    font-family: 'Lato', sans-serif;
                    color: black;
                    text-decoration: none;
                    margin-top: 10px;
                    padding: 15px 30px;
                    border: 1px solid rgba(0,0,0, 0.5);
                    text-align: center;
                    text-transform: uppercase;
                    transition: all .15s ease-in-out;
                    &:hover {
                        border: 1px solid #000;
                        background-color: #fff;
                        -webkit-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                        -moz-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                        box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                    }
                    background: rgba(255,255,255,0.8);
                    border-radius: 6px; 
                }
                `}>
                    Transcribe Now
                </div>
            </div>
        </Cardwrapper>
    )
}


const Cardwrapper = styled.a`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-decoration: none;

    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.75);
    &:hover {
        box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);

    }
    &.card {
        border-radius: 10px;
        overflow: hidden;
        flex-basis: 350px;
        flex-direction: column;
        position: relative;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 10px;
        flex: auto;
        padding: 0;
        margin: 10px;
        max-width: 300px;
        background-color: white;
        text-align: initial;
        > * {
            color: black;
        }
        &:hover {
            z-index: 60000;
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
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
        flex: 1;
        box-shadow: 
            0px 11px 8px -10px  rgba(0,0,0,0.4),
            0px -11px 8px -10px rgba(0,0,0,0.4); 
        height: calc(100% - 250px);
        padding: 20px;
        backdrop-filter: blur(4px);
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