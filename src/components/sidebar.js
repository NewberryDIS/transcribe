import React, { useState }  from "react"
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import { Colors } from '../components/pieces'

const standardcss = css`
    position: relative;
    // display: block;
    flex-basis: 225px;
    width: 225px;
    .stickycontainer {
        position: sticky;
        top: 60px;
    }
    .listwrapper {
        background: black;
        border: 1px solid transparent;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 3px;
        &:hover {
            box-shadow: 2px 4px 10px rgba(0,0,0,0.6);
        }
    }
    .button {
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    ul {
        list-style-type: none;
        padding: 5px;
        margin: 0;
        li {
            color: ${Colors.fgcolor};
            padding: 5px 5px 5px 10px;
            margin: 5px;
            border-left: 1px solid ${Colors.fgcolor};
            border-bottom: 1px solid transparent;
            text-decoration: none;
            background-image: linear-gradient(${Colors.fgcolor}, ${Colors.fgcolor});
            background-position: 0% 105%;
            background-repeat: no-repeat;
            background-size: 0% 2px;
            transition: background-size .2s;
            &:hover {
                background-size: 100% 2px;
            }
        }
    }

    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: white;
        margin: 6px 0;
        transition: 0.4s;
    }
      
    .bar1 {
      -webkit-transform: rotate(-45deg) translate(-9px, 6px);
      transform: rotate(-45deg) translate(-9px, 6px);
    }
    
    .bar2 {opacity: 0;}
    
    .bar3 {
      -webkit-transform: rotate(45deg) translate(-8px, -8px);
      transform: rotate(45deg) translate(-8px, -8px);
    }
    .listContainer {
        transition: width 0.2s, opacity 0.3s;
        flex-basis: 250px;
        padding: 15px;
        width: 225px;
        opacity: 1;
    }
`
const hiddencss = css`
    position: relative;
    // display: block;
    flex-basis: 10px;
    width: 10px;
    .stickycontainer {
        position: sticky;
        top: 60px;
    }
    .listwrapper {
        display: none;
        opacity: 0;
        border: 1px solid transparent;
    }
    .button {
        display: inline-block;
        padding: 2px 7px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        border-radius: 2px;
        background: black;
        border: 1px solid white;
        // position: absolute;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: white;
        margin: 6px 0;
        transition: 0.4s;
    }
    .listContainer {
        transition: width 0.3s, opacity 0.3s;
        flex-basis: 1px;
        padding: 0;
        width: 1px;
        opacity: 0;
    }
`
const Progress = props => <div css={css`
    transition-delay: 0.3s;
    width: 100%;
    border: 1px solid black;
    margin: 30px 0;
    background: white;
    background-image:
        linear-gradient(
            to right, 
            rgba(140, 181, 129,0.75),
            rgba(140, 181, 129,0.75) ${Math.round(props.percent)}%,
            #fff ${Math.round(props.percent)}%,
            #fff
        );
    padding: 5px;
    p {
        text-align: center;
        margin-bottom: 3px;
    }
`}>
    <p>
        {numberWithCommas(props.compl)} out of {numberWithCommas(props.total)} pages completed!
    </p>
</div>
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Sidebar = props => {
    return (
        <div css={props.show ? standardcss : hiddencss}>
            <div className="stickycontainer">
                <div className="listwrapper">
                    <div className="listContainer">
                        <Progress percent={props.allData['summary'].percentComplete} compl={props.allData['summary'].totalcomplete} total={props.allData['summary'].total} />
                        <Search filteredCardData={props.filteredCardData} filterCards={props.filterCards} allData={props.allData['items']} />
                    </div>
                </div>
                <div className="button" onClick={props.setShow}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
        </div>
    )
}
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            type: 'name',
            lang: 'English',
        }
    }

    handleSubmit(txt) {
        this.props.filterCards(txt, this.state.type);
        console.log(txt + ' ' + this.state.type)
        // switch (this.state.type){
        //     case 'subject': console.log('will search subjects');
        //     case 'keyword': console.log('will search keywords');
        //     default: console.log('will search titels');
        // }
    }
    handleChange(e) {
        // var input = e.target.value;
        this.setState({input: e.target.value}, () => {
            console.log(this.state.input);
            this.handleSubmit(this.state.input);
        });
    }
    handleSelect(e) {
        this.setState({type: e.target.value})
    }
    // function handleChange(e){
    //     setInput(e)
    //     let content = props.filteredContent.length > -1 ? props.filteredContent.filter(i => i.name.toUpperCase().indexOf(input.toUpperCase()) > -1) : <div css={css`background: white; padding: 10px;`}>No results</div>
    //     props.setFilteredContent(content)
    // }
    render(){
        return (
        <div>
            <form>
                <input value={this.state.input} onChange={(e) => this.handleChange(e)} type="text" />
                <select onChange={(e) => this.handleSelect(e)}>
                    <option defaultValue value="name">Title</option>
                    <option value="keyword">Transcription Keywords</option>
                    <option value="subj">Subjects</option>
                </select>
            </form>
        </div>
        )
    }
}
export default Sidebar