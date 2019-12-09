import React from "react"
import styled from '@emotion/styled'
import bg from '../images/featured.jpg'
import Sidebar from '../components/sidebar'
import Body from '../components/body'
import Curtain from '../components/curtain'
import Cards from '../components/cards'

const content = require('../data/content.json')

const Index = styled.div`
    * {
        transition: all .15s ease-in-out;
    }
    background: url(${bg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
`

export default class IndexPage extends React.Component {
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
        return (
            <Index>
                <Sidebar dateFilter={this.state.filters.dateFilter} setFilters={this.setFilters} />
                <Body>
                    <Curtain />
                    <Cards items={this.cardData} filters={this.state.filters} />
                </Body>
            </Index>
        )
    }
}
