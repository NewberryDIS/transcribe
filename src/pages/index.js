import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import Sidebar from '../components/sidebar'
import Boxes from '../components/boxes'
import Curtain from '../components/curtain'
import Bar from '../components/bar'
import Footer from '../components/footer'

const Body = styled.div`
    background: rgba(0,0,0,0.1);
    position: relative;
    display: flex;
    * {
        transition: all .25s ease-in-out;
    }
`

const content = require('../data/content.json')

const IndexPage = () => {
    const filters = {
        dates: [1660, 1960],
        subjects: '',
        keywords: ''
    }
    const setFilters = (filters, data, type) => {
        const tempFilters = filters
        tempFilters[type] = data
        filters = tempFilters
    }
    const [curtainToggle, setCurtainToggle] = useState(true) 
    const cToggle = () => {
        console.log('I dont do anything')
        // setCurtainToggle(!curtainToggle)
    }
    const allContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    const currContent = allContent.slice(0,22)
    return (
        <Fragment>
            <Bar />
            <Body>
                <Sidebar cToggle={cToggle} content={filters} setFilters={setFilters} prog={content['summary']}/>
                <Boxes topPadder={curtainToggle} content={currContent}/>
            </Body>
            <Footer />
        </Fragment>
    )
}

export default IndexPage
// {curtainToggle ? <Curtain /> : <Bar />}
