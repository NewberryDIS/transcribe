import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from "@emotion/styled";
import { colors } from './pieces'
// import { Link } from "gatsby"
// import debounce from "lodash.debounce";

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
            cards: this.deck,
            none: false,
        };
        this.makeCards = this.makeCards.bind(this);
        this.filterItems = this.filterItems.bind(this);
    }
    makeCards = (data) => {
        return data.map((i) => { 
            // if there's no image
            let imagePath = i.image && i.image.lastIndexOf('/') > -1 ? i.image.substring(i.image.lastIndexOf('/')) : false
            let image = !imagePath ? 'No Image Found.' : require('../images/thumbs' + imagePath)
            // some descriptions are very long and have html in them
            // we will truncate at the first '<' or 150 characters, whichever is shorter
            let truncationIndex = i.desc && Math.min(i.desc.indexOf('<'), 150)
            let truncatedDesc = truncationIndex > -1 ? i.desc.substring(0,truncationIndex) + '...' : i.desc
            return <Card key={i.id} image={image} title={i.title} desc={truncatedDesc} prog={i.pc} />
        })
    }
    dateChecker = (needles, haystacks) => {
        if (needles.length === 2) {
            if(needles[0] < haystacks[1] && needles[1] > haystacks[0]) {
                return true
            }
        } else {
            for (var d in needles){
                if (haystacks[0] < d && d < haystacks[1]) {
                    return true
                }
            }
        }
        return false
    }
    filterItems = (items) => {
        let counter = 0
        let returnArray = []
        // console.log(items)
        for (var i = 0; counter < 20 && items[i]; i++){
            let add = true
            if (items[i].title && this.props.filters.titleFilter !== '' && items[i].title.toLowerCase().indexOf(this.props.filters.titleFilter.toLowerCase()) === -1){
                add = false
                // console.log('no "' + this.props.filters.titleFilter + '" in ' +items[i].title )
            }
            this.dateChecker(items[i].date, this.props.filters.dateFilter) ? console.log('dates are in range') : add = false
            if (items[i].date && items[i].date[0] > this.props.filters.dateFilter[1] && items[i].date[1] < this.props.filters.dateFilter[0]){
                add = false
                console.log('no "' + this.props.filters.dateFilter + '" in ' + items[i].date )
            }
            if (items[i].transcription !== undefined && this.props.filters.textFilter !== '' && items[i].transcription.toLowerCase().indexOf(this.props.filters.textFilter.toLowerCase()) === -1){
                add = false
                // console.log('no "' + this.props.filters.textFilter + '" in ' + items[i].text )
            }
            if (items[i].desc && this.props.filters.subjectFilter !== '' && items[i].desc.toLowerCase().indexOf(this.props.filters.subjectFilter.toLowerCase()) === -1){
                add = false
                // console.log('no "' + this.props.filters.descFilter + '" in ' + items[i].desc )
            }
            const lang = items[i].lang ? items[i].lang.toLowerCase(): 'english'
            if (lang.indexOf(this.props.filters.langFilter.toLowerCase()) === -1){
                add = false
                // console.log('no "' + this.props.filters.langFilter + '" in ' + lang )
            }
            // console.log('add = ' + add + ' for ' + items[i].title + ' because ' + items[i].title.toLowerCase().indexOf(this.props.filters.titleFilter.toLowerCase()))
            if (add) {
                // console.log(items[i].transcription.toLowerCase().indexOf(this.props.filters.textFilter.toLowerCase()))
                counter++
                returnArray.push(items[i])
            }
        }
        returnArray.length === 0 ? this.setState({none: true}) : this.setState({none: false})
        return returnArray
    }   
    componentDidUpdate(prevProps) {
        // console.log(prevProps.filters)
        if ( prevProps.filters !== this.props.filters){
            this.setState({cards: this.makeCards(this.filterItems(this.props.items))})
        }
    }
    deck = this.makeCards(this.props.items.slice(0,20))
    render () {
        return (
            <Masonrycontainer id="masonrycontainer">
                <Masonry breakPoints={breakPoints}>
                    {this.state.cards}  
                </Masonry>
                    {this.state.none ? <NothingFound /> : ''}
            </Masonrycontainer>
        )
    }
}
const NothingFound = () => <div css={css`
    width: 75%;
    margin: 175px auto 100vh auto;
    background: ${colors.bg};
    color: ${colors.fg};
    border: 5px solid ${colors.fg};
    padding: 30px;
`}>There are no items which match your criteria.</div>
const Card = props => {
    const prog = !props.prog ? 0 : Math.round(props.prog,0)
    return (
        <Cardwrapper href={props.id} className="card" >
            <div className="cardbg" css={css`background-image: url('${props.image}');`} />
            <div className="cardcap">
                <img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
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
                            rgba(140, 181, 129,0.5) ${prog}%,
                            rgba(255,255,255,0.25) ${prog}%,
                            rgba(255,255,255,0.25)
                        );`}>{prog}%</div>
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