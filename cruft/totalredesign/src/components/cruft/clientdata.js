    import React, { Component } from "react"
    /** @jsx jsx */ 
    import { jsx, css } from '@emotion/core'
    import styled from '@emotion/styled'
    import axios from "axios"

// import {dataContent} from '../data/items.json'
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
                box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
                border-radius: 3px;
                &:hover {
                box-shadow: 2px 4px 10px rgba(0,0,0,.6);
                // box-shadow: 0 0 0 1px rgba(0,0,0,.16);
                }
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
                    <p>{props.date[1] ? props.date[0] + ' - ' + props.date[1] : props.date}</p>
                    <p>{props.status}</p>
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
class DataGetter extends Component {
    state = {
        loading: false,
        error: false,
        stateContent: {
            content: '',
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
    
    fetchStateContent = () => {
        this.setState({ loading: true })
        axios
        .get(apiurl)
        // .get(dataContent)
        .then(stateContent => {
            const {
            data: { id: content },
            } = stateContent
            const items = stateContent.data
                .slice(0, 100)    
                .map((item, index) => {
                    let itemData = {}
                    let id = item.id
                    itemData[id] = {}
                    itemData[id].name = ''
                    let longDateString = ''
                    let dateRange = ''
                    itemData[id].dates = []
                    itemData[id].decades = []
                    itemData[id].subjects = []
                    itemData[id].desc = ''
                    itemData[id].image = ''
                    itemData[id].status = ''
                    item.element_texts.map((et) => {
                        if (et.element.name === 'Title') {
                            itemData[id].name = et.text
                            longDateString = itemData[id].name.slice(itemData[id].name.lastIndexOf(',')+2).trim()
                            dateRange = longDateString.match(/[0-9]{4}-[0-9]{4}/)
                            if ( dateRange != null ){
                                console.log(dateRange[0])
                                itemData[id].dates.push(parseInt(dateRange[0].slice(0,4)), parseInt(dateRange[0].slice(5,9)))
                            } else if (longDateString.match(/[0-9]{4}/) != null) {
                                itemData[id].dates.push(parseInt(longDateString.match(/[0-9]{4}/)))
                            } 
                        } else if (et.element.name === 'Subject'){
                            itemData[id].subjects.push(et.text)
                        } else if (et.element.name === 'Relation') {
                            itemData[id].desc = et.text
                        } else if (et.element.name === 'Source' && et.text.indexOf('http' === 0)) {
                            itemData[id].image = et.text
                        } else if (et.element.name === 'Status') {
                            itemData[id].status = et.text
                        }
                    })
                    // return <Card title={name} desc={desc} />
                    // console.log(this.state.items)
                    // return this.itemData
                    const sidebarContent = {
                        percentage: id,
                    }
                    this.props.setDataContent(sidebarContent)
                    return <Card key={id} title={itemData[id].name} status={itemData[id].status} desc={itemData[id].desc} date={itemData[id].dates} />
                })
            this.setState({
            loading: false,
            stateContent: {
                ...this.state.stateContent,
                content: items,
            },
            })
            
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: false, error })
        })
    }
}
export default DataGetter