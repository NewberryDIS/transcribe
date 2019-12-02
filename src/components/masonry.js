import React from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import styled from "@emotion/styled";
import { Link } from "gatsby"
import debounce from "lodash.debounce";
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
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            cards: this.cardMaker(this.props.items.slice(this.leftoff, (this.leftoff + 20)), this.props.filters),
        };
        this.leftoff = 0; 
        // this.cards = this.cardMaker(this.props.items.slice(this.leftoff, 20), this.props.filters);
        this.cardMaker = this.cardMaker.bind(this);
        const wndw  = typeof window !== 'undefined' ? window : null
        wndw !== null ? window.onscroll = debounce(() => {
            console.log(document.documentElement.offsetHeight + ' ' + (document.documentElement.offsetHeight * 0.75))
            const {
                loadCards,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop
                > document.documentElement.offsetHeight * 0.75
            ) {
                loadCards();
            }
        }, 100) : '';
    }
    componentDidMount() {
        console.log('working to this point (CDM')
        this.loadCards();
      }
    
    loadCards = () => {
        console.log(this.leftoff )
        this.setState({ isLoading: true }, () => {
            const nextCards = this.cardMaker(this.props.items.slice(this.leftoff, (this.leftoff + 20)), this.props.filters)
            this.setState({
                isLoading: false,
                cards: [
                    ...this.state.cards,
                    ...nextCards,
                ],
                });
            })
        }

    cardMaker(data,filters){
        return data.map((i, index) => {
            let add = true
            if (filters.titleFilter !== '' && i.title.indexOf(filters.titleFilter) === -1){
                add = false
                console.log(i.title)
            }
            if (i.date[0] > filters.dateFilter[1] && i.date[1] < filters.dateFilter[0]){
                add = false
                console.log(i.date)
            }
            if (filters.textFilter !== '' && i.transcription.indexOf(filters.textFilter) === -1){
                add = false
                console.log(i.date)
            }
            if (filters.subjectFilter !== '' && i.desc.indexOf(filters.subjectFilter) === -1){
                add = false
                console.log('falsed on subj')
            }
            const lang = i.lang ? i.lang : 'English'
            if (lang.indexOf(filters.langFilter) === -1){
                add = false
                console.log(lang)
            }
            if (add && index < 20) {
                this.leftoff++
                let imagePath = i.image.lastIndexOf('/') > -1 ? i.image.substring(i.image.lastIndexOf('/')) : false
                let image = !imagePath ? 'No Image Found.' : require('../images/thumbs' + imagePath)
                let truncationIndex = i.desc && Math.min(i.desc.indexOf('<'), 150)
                let truncatedDesc = truncationIndex > -1 ? i.desc.substring(0,truncationIndex) + '...' : i.desc
                return <Card key={i.id} image={image} title={i.title} desc={truncatedDesc} prog={i.pc} />
            }
        })
    }

    render() { 
        const {
            error,
            hasMore,
            isLoading,
            users,
        } = this.state;
        // titleFilter: '',
        // dateFilter: [1600, 2000],
        // textFilter: '',
        // subjectFilter: '',
        // langFilter: 'English',
        return (
            <Masonrycontainer id="masonrycontainer">
                <Masonry breakPoints={breakPoints}>
                    {this.state.cards}  
                </Masonry>
            </Masonrycontainer>
        )
    }
}
const Card = props => {
    const prog = !props.prog ? 0 : props.prog
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
                        );`}>{Math.round(prog)}%</div>
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