import React, { Component } from 'react';

const Colls = props => {
    return (
        <div>
            {props.collections
                .slice(0, 15)
                .map((coll, i) => {
                    const html = []; 
                    for (const v in coll.element_texts) { coll.element_texts[v].html === true ? html.push(coll.element_texts[v].text) : '' }
                    return (
                        <div key={i}><h3>{coll.element_texts[0].text}</h3><p>{html}</p></div>
                    )
            })}
        </div>
    )
}

const apikey = process.env.GATSBY_OMEKA_API_KEY
const apiurl = 'https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/items?key=' + apikey
    class Apipuller extends Component {
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
        return (
          <Colls collections={this.state.collections} />
        )
      }
    }

export default Apipuller