import React from "react"
import Sidebar from './sidebar'
import { Container, z } from './pieces'
import Cardsection from './masonry'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import Header from './header'

import { colors } from '../components/pieces'
// const data = require('../data/items.json');

const content = require('../data/content.json')
// items.sort((a,b) => (a.weight > b.weight) ? 1 : -1)
// const collections = require('../data/collections.json')
// const decades = require('../data/decades.json')
// const summary = require('../data/summary.json')
// const allData = [summary, items, collections, decades]




class Body extends React.Component {
    constructor() {
        super()
        this.state = {
            filters: {
                titleFilter: '',
                dateFilter: [1600, 2000],
                textFilter: '',
                subjectFilter: '',
                langFilter: 'English',
            },
        };
        this.setFilters = this.setFilters.bind(this);
    }
    
    cardData = content['items']
    // componentWillMount() {
    //     this.setState({
    //         filteredCardData: this.state.cardData
    //     })
    // }
    setFilters = (needle, type) => {
        let filters = this.state.filters
        filters[type] = needle
        this.setState({filters: filters })
        console.log(filters)
    }
    // filterCards = (cardFilter, type) => {
    //     let filteredCards = this.state.cardData
    //     filteredCards = filteredCards.filter((i) => {
    //         let cardContent = i[type].toLowerCase()
    //         return cardContent.indexOf(cardFilter.toLowerCase()) !== -1
    //     })
    //     this.setState({filteredCardData: filteredCards})
    // }
    setShow(){
        this.setState({show: !this.state.show})
    }
    render(){
        return(
            <section id="top" css={css`
                z-index: ${z.mid};
            `}>
                <Header />
                <Container  wrap={'nowrap'} css={css`
                    justify-content: stretch;
                `}>
                    <Cardsection items={this.cardData} filters={this.state.filters}/>
                </Container>
            </section>
        )
    }
}
export default Body