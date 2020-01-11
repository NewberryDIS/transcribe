import React, { useState } from 'react'
import Box from './box'
import styled from '@emotion/styled'
import Sidebar from './simplesidebar'
import { mq } from './mediaQueries'

const Boxescss = styled.div`
    width: 100%;
    display: flex;
    align-content: flex-end;
    .boxspacer {
        flex: 1;
    }
    .boxwrapper, .panelwrapper {
        margin-top: 20vmin;
        position: relative;
        width: 79vw;
        flex-basis: 79vw;
        justify-content: space-evenly;
        align-content: space-evenly;
        display: flex;
        flex-wrap: wrap;
        font-family: sans-serif;
        .box {
            text-decoration: none;
            color: black;

        }
    }
    .panelwrapper {
        flex-direction: column;
        .box {
            flex: 1;
            height: auto;
            display: flex;
            width: 85%;
            overflow: hidden;
            img {
                order: 1;
                flex-basis: 20vw;
                background-size: cover;
            }
            .boxFooter {
                order: 2;
                flex: 1;
                padding: 15px;
            }
            .searchtextpanel {
                height: 100%;
                overflow: auto;
                display: block;
                order: 3;
                flex: 2;
                padding: 25px;
            }
        }
    }
    .boxwrapper {
        .box {
            .searchtextpanel {
                display: none;
            }
            display: block;
            margin: 1vw;
            position: relative;
            overflow: hidden;
            border: 1px solid #333;
            border-top: 1px solid black;
            box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
            background: white;
            font-family: 'Lato', sans-serif;
            height: 20vw;
            width: 20vw;
            img {
                transition: top 0.2s;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
                border: 0;
                z-index: 3;
                position: absolute;
                box-shadow: 2px 4px 4px rgba(0,0,0,0.4);
                height: 20vw;
            }
            .boxFooter {
                position: absolute;
                z-index: 2;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                .boxtext {
                    flex: 1;
                }
                h3 {
                    margin-bottom: 7px;
                }
            }
            h3 {
                // font-size: 1rem;
                font-size: calc(1vw + 8px);
            }
            p {
                font-size: 0.85rem;
                line-height: 0.85rem;
                padding: 0;
            }
            .boxFooter {
                p, h3 {
                    margin: 0;
                    margin: 0 0 7px 0;
                    padding: 0px 10px;
                }
                height: 13vw;
            }
            &:hover {
                img {
                    top: -15vw;
                }
            }
        } 
    }        
`
    const Morebutton = styled.div`
        width: 100%;
        text-align: center;
        .button {
            font-family: sans-serif;
            margin: 25px auto;
            display: inline-block;
            width: initial;
            padding: 12px 15px ;
            border: 1px solid black;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: inset 0 0 10px rgba(0,42,85,1);
            background: rgba(125,159,193,1);
            color: rgba(37,37,37,0.8);
            transition: background 0.5s, color 0.1s;
            &:hover {
                color: rgba(37,37,37,1);
                background: rgba(143,169,195,1);
            }
            &.inactive {
                cursor: not-allowed;
                box-shadow: inset 0 0 10px rgba(37,37,37,1);
                background: rgba(125,125,125,1);
                color: rgba(37,37,37,0.4);
                transition: background 0.5s, color 0.1s;
                &:hover {
                    color: rgba(37,37,37,0.4);
                    background: rgba(125,125,125,1);

                }
            }
        }
    }
`

const Boxes = props => {
    const [boxWidth, setBoxWidth] = useState(true);
    const [filters, setFilters] = useState({
        textFilter: '',
        dateFilter: [1660,1990],
        langFilter: 'English',
        subjectFilter: '' 
    });
    const [showButton, setShowButton] = useState(true);
    const qty = 18
    function applyFilters(content){
        let tempCurrContent = content.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            langfilter = i.lang.indexOf(filters.langFilter) > -1 ? true : false
            if (filters.textFilter.length > 0){
                textfilter = i.transcription.toLowerCase().indexOf(filters.textFilter) === -1 ? false : true
            }
            if (i.date.length === 1){
                datefilter = i.date[0] >= filters.dateFilter[0] && i.date[0] <= filters.dateFilter[1] ? true : false
            } else if (i.date.length === 2) {
                datefilter = i.date[0] <= filters.dateFilter[1] && i.date[1] >= filters.dateFilter[0] ? true : false
            } else {
                for (let d in i.date){
                    datefilter = i.date[d] >= filters.dateFilter[0] && i.date[d] <= filters.dateFilter[1] ? true : false
                }
            }
            // the first one is probably going to work once we have subjects in the data, but it's untested; currently its just searcing in the description, which will probably always fail, so subjects is nonfunctional, but will not error
            if (filters.subjectFilter.length > 0){
                // subjfilter = i.subjects.indexOf(filters.subjectFilter) === -1 ? false : true
                subjfilter = i.desc.indexOf(filters.subjectFilter) === -1 ? false : true
            }
            // let returnValue  = 
            return datefilter && langfilter && textfilter && subjfilter
        })
        return tempCurrContent
    }
    function boxer(){
        const filteredContent = applyFilters(props.currContent)
        const currLength = boxes === undefined ? 0 : boxes.length
        // console.log(boxes)
        const boxerContent = currLength >= (filteredContent.length - qty) ? filteredContent.slice(currLength, filteredContent.length) : filteredContent.slice(currLength, currLength + qty)
        const moreBoxes = boxerContent.map((i, index) => {
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
            return <Box key={currLength + index} className="box" title={i.title} text={i.desc} img={img} filters={filters} script={i.transcription} />
        })
        // console.log(moreBoxes.length)
        // if (boxes && boxes.length >= filteredContent.length) {setShowButton(false)}
        return moreBoxes
    }
    const intitialBoxes = boxer()
    const [boxes, setBoxes] = useState(intitialBoxes);
    return (
        <Boxescss >
            <Sidebar progress={props.progress} filters={filters} boxer={boxer} setFilters={setFilters} setBoxes={setBoxes} setBoxWidth={setBoxWidth} />
            <div className={boxWidth ? 'boxwrapper' : 'panelwrapper'}>
                {console.log(boxes)}
                {boxes}
                <Morebutton><div className={showButton ? 'button' : 'button inactive'} onClick={() => setBoxes(boxes => ([...boxes, ...boxer()]))}>More</div></Morebutton>
            </div>
        </Boxescss>
    )
}

export default Boxes