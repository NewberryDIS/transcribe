import React from "react"
import Sidebar from './sidebar'
import {Container} from './pieces'
import Cardsection from './cardsection'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

// const data = require('../data/items.json');

const items = require('../data/content.json')
const collections = require('../data/collections.json')
const decades = require('../data/decades.json')
const summary = require('../data/summary.json')
const allData = [summary, items, collections, decades]


class Body extends React.Component {
    constructor() {
        super()
        this.state = {
            show: true,
            cardData: allData[1],
            filteredCardData: []
        }
    }

    componentWillMount() {
        this.setState({
            filteredCardData: this.state.cardData
        })
    }
    filterCards = (cardFilter, type) => {
        let filteredCards = this.state.cardData
        filteredCards = filteredCards.filter((i) => {
            let cardContent = i[type].toLowerCase()
            return cardContent.indexOf(cardFilter.toLowerCase()) !== -1
        })
        this.setState({filteredCardData: filteredCards})
    }
    setShow(){
        this.setState({show: !this.state.show})
    }
    render(){
        return(
            <section>
                <Container wrap={'nowrap'} css={css`
                    justify-content: stretch;
                `}>
                    <Sidebar show={this.state.show} setShow={this.setShow} filterCards={this.filterCards} filteredCardData={this.state.filteredCardData} allData={allData} />
                    <Cardsection items={this.state.filteredCardData} filterCards={this.filterCards}/>
                </Container>
            </section>
        )
    }
}
export default Body