import React from "react"
import { Container, z } from './pieces'
import Cardsection from './masonry'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import Header from './header'
import Sidebar from "./sidebar"

const content = require('../data/content.json')

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
            cardStyle: 'narrow',
        };
        this.setFilters = this.setFilters.bind(this);
    }
    cardData = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    setFilters = (needle, type) => {
        let filters = this.state.filters
        filters[type] = needle
        this.setState({filters: { ...filters, [type]: needle }})
        // console.log(filters)
    }
    render(){
        return(
            <section id="top" css={css`
                z-index: ${z.mid};
            `}>
                {/* <Header dateFilter={this.state.filters.dateFilter} setFilters={this.setFilters} /> */}
                <Sidebar />
                <Container  wrap={'nowrap'} css={css`
                    justify-content: flex-end;
                    align-content: flex-end;
                    margin: auto;
                `}>
                    <Cardsection items={this.cardData} filters={this.state.filters}/>
                </Container>
            </section>
        )
    }
}
export default Body