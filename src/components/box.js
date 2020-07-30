import React, { useState } from 'react'
import styled from '@emotion/styled'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom';
import { colors, fonts, Bluebutton } from '../components/csscomponents'
// import { insertParam } from '../components/searchcomponents'
import Progress from '../components/OLD.progress'

// @media ( min-width: 1300px ) { width: 20vw;  }
// @media ( min-width: 951px ) and ( max-width: 1300px ) { width: 30vw;  }
// @media ( max-width: 950px ) { width: 40vw; }
const Boxcss = styled.div`

    background: rgba(${colors.bg}, 1);
    border: 2px solid rgba(${colors.fg}, 1);
    box-shadow: inset 0 0 10px rgba(${colors.hl},0.5);
    position: relative;
    overflow: hidden;
    width: 250px !important;
    img {
        margin: 0;
        padding: 0;
        width: 100%;

        box-shadow:  0 0 8px rgba(${colors.fg},1);
    }
    .text {
        padding: 0 15px 15px 15px;
    }
    .title h3, .progress {
        font-family: ${fonts.serif};
        padding: 5px 0;
    }
    .desc, .cats {
        font-family: ${fonts.sans};
    }
    .desc {
        font-size: 0.85rem;
    }
    h3 {
        line-height: 25px;
        padding: 0;
        margin: 0;
        font-size: 22px;
        a {
            transition: color 0.2s;
            text-decoration: none;
            color: rgba(${colors.fg}, 0.8);
            background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s, color 0.2s;

            &:hover {
                color: rgba(${colors.fg}, 1);
                background-size: 100% 3px;
            }
        }
    }
    .cats {
        margin: 0 ;
        span {
            margin: 0 ;
            padding: 0 5px;
            display: inline;
            border: 1px solid transparent;
            a {
                font-size: 0.7rem;
                text-transform: uppercase;
                text-decoration: none;
                line-height: 15px;
                height: 15px;
                &:link, &:visited {
                    color: rgba(${colors.hl},1);
                }
                &:hover, &:active {
                    color: rgba(${colors.hl},0.75);
                }
            }
            border-right: 1px solid rgba(${colors.hl},1);
            background-image: linear-gradient(transparent 1px, rgba(${colors.hl},1) 1px);
            background-size: 0% 1px;
            background-position: 0% 101%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s;
            &:hover {
                background-size: 100% 2px;
            }
            &:first-of-type {
                padding: 0 5px 0 0;
            }
            &:last-of-type {
                border-right: 0;
            }
        }
    }

    .active {
        display: block;
        span {
            overflow-wrap: break-word;
            word-wrap: break-word;
            -ms-word-break: break-all;
            word-break: break-word;
            -ms-hyphens: auto;
            -moz-hyphens: auto;
            -webkit-hyphens: auto;
            hyphens: auto;
        }
    }
    .inactive {
        display: none;
    }
    .resultstext {
        line-height: 36px;
        display: block;
        text-align: center;
        flex-shrink: 0;
    }
    .searchtextpanel {
        padding: 0;
        background: rgba(${colors.bg},1);
        border: 1px solid rgba(${colors.fg},1);
        color: rgba(${colors.fg},1);
        margin: -10px 0 0 0;
        height: 300px;
        overflow: auto;
        position: relative;
     
        .topwrapper {

            position: sticky;
            top: 0;
        }
        .bottomlink {
            position: sticky;
            bottom: 0;
            a {
                text-decoration: none;
            }
        }
        .topwrapper {
            padding: 5px 0;
            margin: 0;
            width: 100%;
            height: 40px;
            display: flex;
            justify-items: center;
            flex-direction: row;
            background: rgba(${colors.bg},1);
            box-shadow:  0 0 8px rgba(${colors.fg},1);
            .resultcount, .btncontainer {
                margin: auto;
                text-align: center;
            }
            .btncontainer {
                @media (min-width: 1201px ) { flex: 1;}
                @media (max-width: 1200px ) { flex-basis: 50px;}
            }
            .resultcount {
                flex: 1;
            }
            p {
                margin: 0;
                line-height: 30px;
            }
            button {
                height: 30px;
                width: 30px;
                transition: all 0.2s;
            }
            
        }
        .magiclink {
            color: rgba(${colors.fg}, 1);
            line-height: 30px;
            margin: auto;
            text-decoration: none;
            background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 0.8) 2px);
            background-size: 0% 2px;
            background-position: 0% 105%;
            background-repeat: no-repeat;
            transition: background-size 0.2s ease 0s;
            // border: 1px solid rgba(${colors.fg}, 1);
            cursor: pointer;
            // box-shadow: 0 0 10px rgba(0,42,85,0.2);
            &:hover {
                // border-bottom: 1px solid rgba(${colors.hl}, 1);
                background-size: 100% 3px;
            }
        }
    .hilitecontent {
        display: block;
        padding: 15px;
    }
    .activearrow {
        color: rgba(${colors.fg}, 1);
        border: 1px solid rgba(${colors.fg}, 1);
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,42,85,0.2);
        &:hover {
            box-shadow: 0 0 10px rgba(0,42,85,0.5);
        }
    }
    .inactivearrow {
        color: rgba(${colors.fg}, 0.5);
        border: 1px solid rgba(${colors.fg}, 0.5);
        cursor: not-allowed;
        box-shadow: inset 0 0 10px rgba(0,42,85,0.2);
        &:hover {
            box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
        }
    }
`
const Textbox = props => {
    return (
    <div className={props.activePage === props.index ? 'active' : 'inactive'}>
        <div className="topwrapper">
            <div className="btncontainer"><button className={props.total > 1 ? 'leftarrow activearrow' : 'leftarrow inactivearrow'} onClick={() => props.pageSwitch('back')}>&#60;</button></div>
            <div className="resultcount">Result {props.index + 1} of {props.total}</div>
            <div className="btncontainer"><button className={props.total > 1 ? 'rightarrow activearrow' : 'rightarrow inactivearrow'} onClick={() => props.pageSwitch('forward')}>&#62;</button></div>
        </div>
        <Highlighter
            className="hilitecontent"
            highlightClassName="hilite"
            searchWords={[props.filter]}
            textToHighlight={props.searchresult.transcription}
        />
        <Bluebutton className="bottomlink"><div className="wrapper"><a className="button"  href={'https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/' + props.id + '/' + props.searchresult.pageid} >Go to page</a></div></Bluebutton>
        
    </div>
)}
const TextSearchResults = ({ tsr, id, filter }) => {
    const [activePage, setActivePage] = useState(0)
    const pageSwitch = dir => {
        const adder = dir === 'back' ? -1 : 1
        const newPage = adder + activePage > tsr.length - 1 ? 0 : adder + activePage < 0 ? tsr.length - 1 : adder + activePage
        setActivePage(newPage)
        // props.setBgImage('https://publications.newberry.org/transcription/mms-transcribe/files/original/' + props.searchresults[newPage].pagefilename)
    }
    const results = tsr.map((t, i) => {
        // console.log(t)
        if (t.transcription && t.transcription.length > 0) {
            return <Textbox key={t.pageid} id={id} activePage={activePage} pageSwitch={pageSwitch} total={tsr.length} filter={filter} searchresult={t} index={i} />
        } else {
            return true
        }
    })
    return (
        <div className="searchtextpanel">
            {results}
        </div>
    )
}
const Box = ({ boxProps }) => {
    const title = boxProps.title.length > 100 ? boxProps.title.substring(0,100) + '...' : boxProps.title
    const img = boxProps.image!== undefined ? (boxProps.image.indexOf('default.jpg') > -1 ? boxProps.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : boxProps.image.indexOf('mms-transcribe') > -1 ? boxProps.image : boxProps.image  + '/full/400,/0/default.jpg') : ''
    return (
        <Boxcss show={boxProps.show} >
            <div className="image"><Link to={'item/' + boxProps.id}><img src={img} alt={title}/></Link></div>
            <div className="text">
                <div className="title">
                    <h3><Link to={'item/' + boxProps.id} >
                        {title}
                    </Link></h3>
                    </div>
                <div className="desc">{boxProps.desc}</div>
                <div className="progress">
                    <Progress percentComplete={boxProps.percentComplete} />
                </div>
                
            </div>
        </Boxcss>
    )
}
export default Box