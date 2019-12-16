import React, { Fragment, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Sidebar from '../components/sidebar'
import Boxes from '../components/boxes'
import Curtain from '../components/curtain'
import Bar from '../components/bar'
import Footer from '../components/footer'

const Body = styled.div`
    // background: rgba(0,0,0,0.1);
    position: relative;
    display: inline-block;
    width: 100%;
    clear: both;
    * {
        transition: all .25s ease-in-out;
    }
`

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
    
    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}



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
    const { height, width } = useWindowDimensions();
    const widthCount = width > 1000 ? 20 : width > 600 ? 30 : 49
    console.log(widthCount)
    // const allContent = content['items']
    const allContent = content['items'].sort((a,b) => (a.weight > b.weight) ? 1 : -1)
    const currContent = allContent.slice(0,22)
    return (
        <Fragment>
            <Bar />
            <Body>
                <Sidebar widthCount={widthCount} content={filters} setFilters={setFilters} prog={content['summary']}/>
                <Boxes widthCount={widthCount} content={currContent}/>
            </Body>
        </Fragment>
    )
}

export default IndexPage
// {curtainToggle ? <Curtain /> : <Bar />}
