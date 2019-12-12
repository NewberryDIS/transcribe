import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from "@emotion/styled";
import { colors, z } from './misc'
import Card from './card'
// import { Link } from "gatsby"
// import debounce from "lodash.debounce";

let breakPoints = [400, 700, 850, 1400];

const Masonrycontainer = styled.div`
    width: calc(100% - 200px);
    margin-top: 10px;
    padding: 4px;
    z-index: 2;
    position: fixed;
    top: 10px;
    max-height: 100vh;
    min-height: 100vh;
    overflow: scroll;
    // float: left;

  overflow-y: scroll;
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
    windowChecker = typeof window !== 'undefined' ? true : false
    componentDidMount() {
        this.onResize();
        const adder = this.windowChecker ? window.addEventListener('resize', this.onResize) : ''
    }
    componentWillUnmount() {
        const remover = this.windowChecker ? window.removeEventListener('resize', this.onResize) : ''

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
        const windowChecker = typeof window !== 'undefined' ? true : false
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
            return <Card key={i.id} image={image} title={i.title} desc={truncatedDesc} id={i.id} prog={i.pc} />
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
                console.log('no "' + this.props.filters.titleFilter + '" in ' +items[i].title )
            }
            this.dateChecker(items[i].date, this.props.filters.dateFilter) ? console.log('dates are in range') : add = false
  
            if (items[i].transcription !== undefined && this.props.filters.textFilter !== '' && items[i].transcription.toLowerCase().indexOf(this.props.filters.textFilter.toLowerCase()) === -1){
                add = false
                console.log('no "' + this.props.filters.textFilter + '" in ' + items[i].text )
            } else { 
                console.log(this.props.filters.textFilter + ' is in ' + items[i].transcription)
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
                console.log(counter)
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
    position: fixed;
    top: 35vh;
    z-index: ${z.top};
    width: 75%;
    margin: 175px auto 100vh auto;
    background: ${colors.bg};
    color: ${colors.fg};
    border: 5px solid ${colors.fg};
    padding: 30px;
`}>There are no items which match your criteria.</div>
