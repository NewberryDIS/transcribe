import React, { Component } from "react"
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import axios from "axios"

const Card = props => {
    function clickHandler() {
        let index = Math.round(Math.random() * 10) % 5
        console.log(index)
        alert(messages[index])
    }
    return (
        <div css={css`
            ${props.type === 'card' ? 'flex: auto;  width: 450px;' : 'width: 95%;'}
            display: flex;
            height: 250px;
            margin: 20px;
            padding: 0;
            background: white;
            img {
                flex: 1;
                width: 50%;
                height: 100%;
                padding: 0;
                margin: 0;
                background: url('${props.image}');
                background-size: 300%;
                background-position: center;
            }
            div {
                flex: 1;
                h3 {
                    padding: 5px;
                    margin: 0;
                }
                p {
                    padding: 5px;
                    margin: 0;
                }
            }
        `} >
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            <div>
                <h3>{props.title}</h3>
                <p onClick={clickHandler}>{props.desc}</p>
            </div>
        </div>
    )
}
const messages = [
    `please don't click that again`,
    `Jen said she's busy`,
    `why don't you just do it yourself`,
    `I wasn't serious, clicking here does nothing.  Well, it makes this message show up, this one, or one of several others.  Keep clicking and see if you can get them all!`,
    `Request processing.  Please allow 6-8 weeks for completion.`,
]


const Cardcontainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const apiurl = proxyurl + 'https://publications.newberry.org/transcription/mms-transcribe/api/items'
class ClientFetchingExample extends Component {
  state = {
    loading: false,
    error: false,
    stateContent: {
      content: "",
    },
  }
  componentDidMount() {
    this.fetchStateContent()
  }
  render() {
    const { content } = this.state.stateContent
    return (
        <div>
            {this.state.loading ? (
                <p>Loading...</p>
            ) : !this.state.error ? (
                
                <Cardcontainer>{content}</Cardcontainer>
            ) : (
                <p>Error fetching data :(</p>
            )}
        </div>
    )
  }
  makeCard = props => {
      props.map((content) =>
      <li>{content.id}</li>
    );
  }
  fetchStateContent = () => {
    this.setState({ loading: true })
    axios
      .get(apiurl)
      .then(stateContent => {
        const {
          data: { id: content },
        } = stateContent
        const cards = stateContent.data
            .slice(100, 200)    
            .map((item, index) => {
                let title = ''
                let desc = ''
                let image = ''
                index < 100 ? 
                    item.element_texts.map((el) => 
                        el.element.name === 'Relation' ? desc = el.text 
                        : el.element.name === 'Title' ? title = el.text 
                        : el.element.name === 'Source' &&  el.text.indexOf('http') !== -1 ? image = el.text : desc = 'Click here to request that Jen Wolfe write a short description of this item.'
                    ) : console.log(index)
                return (
                    // console.log(index + ': ' + item.id + ': ' + title + ': ' + desc + ', ' + image)
                    <Card type={index % 15 === 14 ? 'banner' : 'card'} key={item.id} title={title} image={image} desc={desc} id={item.id} />
                )
            })
        this.setState({
          loading: false,
          stateContent: {
            ...this.state.stateContent,
            content: cards,
          },
        })
        
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}
export default ClientFetchingExample