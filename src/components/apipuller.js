import React, { Component } from 'react';

const Colls = props => {
    return (
        <div>

        {props.collections.map((coll) => (
            <div key={coll.id} className="card">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{coll.id}</h6>
                <p className="card-text">{coll.url}</p>
              </div>
            </div>
          ))}
        </div>
    )
}

// console.log(process.env.GATSBY_OMEKA_API_KEY);
const apikey = process.env.GATSBY_OMEKA_API_KEY
const apiurl = 'https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/collections?key=' + apikey
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