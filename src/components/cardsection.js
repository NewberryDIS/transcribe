import React, { Component } from "react"
import styled from '@emotion/styled'
import {FontSizes} from './pieces'
import pic from '../images/img.jpg'
// import {cardArray} from './cardarray'

/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import Masonry from 'react-masonry-css'

const apikey = process.env.GATSBY_OMEKA_API_KEY
const apiurl = 'https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/items?key=' + apikey

const Card = styled.div`
    flex: 1;
    width: 200px;
    min-height: 200px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: white;
    p {
        padding: 0 10px;
        line-height: ${FontSizes.xs};
        font-size: ${FontSizes.xs};
    }
    h3 {
        margin: 7px 0;
        padding: 0 10px;
        font-size: ${FontSizes.sm};
    }
`
const Main = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    .masonry-grid {
        display: flex;
        width: auto;
        margin: auto;
    }
    .masonry-grid_column {
        padding-left: 3px;
        background-clip: padding-box;
    }
    .masonry-grid_column > div {
        margin-bottom: 3px;
    }
`
// const cards  = cardArray.map((el, i) =>
//     <Card key={i} ><img src={pic} css={css`flex-basis: auto; width: ${el.w}; height: ${el.h}px;`}/><h3>{el.title}</h3><p>{el.desc}</p></Card>
// );

class Cardsection extends React.Component {
    state = {
        collections: []
    }
    componentDidMount() {
        fetch(apiurl)
        .then(res => res.json())
        .then((data) => {
            this.setState({ collections: data })
        })
        .catch(console.log)
    }
    render() {
    const sidebarBreakpoints = {
        default: 5,
        1200: 4,
        1050: 3,
        800: 2,
        650: 1
    }
    const noSidebarBreakpoints = {
        default: 5,
        1100: 4,
        850: 3,
        650: 2,
        400: 1
    }
    return (
        <Main>
            <Masonry className="masonry-grid" columnClassName="masonry-grid_column">
                <Cards collections={this.state.collections}/>
                {console.log('cards what?')}
            </Masonry>
        </Main>
        )
    }
}


const Cards = props => {
    return (
        <div>
            {props.collections
                .slice(0, 15)
                .map((coll, i) => {
                    const html = []; 
                    for (const v in coll.element_texts) {html.push( coll.element_texts[v].html ? coll.element_texts[v].text.substring(0,100) + '...': '')}
                    return (
                        <Card key={i} ><img src={pic} css={css`flex-basis: auto; width:100%; height: 230px;`}/><h3>{coll.element_texts[0].text}</h3><p>{html}</p></Card>
                    )
            })}
        </div>
    )
}

// class Apipuller extends Component {
//         state = {
//             collections: []
//         }
//         componentDidMount() {
//             fetch(apiurl)
//             .then(res => res.json())
//             .then((data) => {
//                 this.setState({ collections: data })
//             })
//             .catch(console.log)
//         }
//         render() {
//         return (
//           <Colls collections={this.state.collections} />
//         )
//       }
//     }

export default Cardsection