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
            display: flex;
            width: 100%;
            overflow: auto;
            img {
                order: 1;
                flex-basis: 20vw;
            }
            .boxFooter {
                order: 2;
                flex: 1;
                padding: 15px;
            }
            .searchtextpanel {
                display: block;
                order: 3;
                flex: 2;
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
            }
            height: 20vw;
            width: 20vw;
            img {
                height: 20vw;
            }
            .boxFooter {
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
    let currContent = applyFilters()
    const qty = 18
    const initialBoxes = currContent.slice(0,qty).map((i, index) => {
        const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
        return <Box key={index} className={boxWidth ? 'box' : 'panel'} title={i.title} text={i.desc} img={img} link={i.id} filters={filters} script={i.transcription} />
    })
    const [boxes, setBoxes] = useState(initialBoxes);
    function boxer(tempCurrContent){
        let currLength = boxes === undefined ? 0 : boxes.length
        let boxerContent = currLength >= (tempCurrContent.length - qty) ? tempCurrContent.slice(currLength, tempCurrContent.length) : tempCurrContent.slice(currLength, currLength + qty)
        let moreBoxes = boxerContent.map((i, index) => {
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
            return <Box key={currLength + index} className="box" title={i.title} text={i.desc} img={img} filters={filters} script={i.transcription} />
        })
        if (boxes && boxes.length >= tempCurrContent.length) {setShowButton(false)}
        return moreBoxes
    }
    function applyFilters(){
        console.log(filters)
        let tempCurrContent = props.currContent.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            // language filter
            langfilter = i.lang.indexOf(filters.langFilter) > -1 ? true : false
            // text filter
            if (filters.textFilter.length > 0){
                textfilter = i.transcription.indexOf(filters.textFilter) === -1 ? false : true
            }
            // date filter
            if (i.date.length === 1){
                datefilter = i.date[0] >= filters.dateFilter[0] && i.date[0] <= filters.dateFilter[1] ? true : false
            } else if (i.date.length === 2) {
                datefilter = i.date[0] <= filters.dateFilter[1] && i.date[1] >= filters.dateFilter[0] ? true : false
            } else {
                for (let d in i.date){
                    datefilter = i.date[d] >= filters.dateFilter[0] && i.date[d] <= filters.dateFilter[1] ? true : false
                }
            }
            // subject filter
            // the first one is probably going to work once we have subjects in the data, but it's untested; currently its just searcing in the description, which will probably always fail, so subjects is nonfunctional, but will not error
            if (filters.subjectFilter.length > 0){
                // subjfilter = i.subjects.indexOf(filters.subjectFilter) === -1 ? false : true
                subjfilter = i.desc.indexOf(filters.subjectFilter) === -1 ? false : true
            }
            // console.log('language filter: ' + langfilter + '; ' + '; text filter: ' + textfilter + '; date filter: ' + datefilter + '; subj filter: ' + subjfilter)
            return datefilter && langfilter && textfilter && subjfilter
        })
        return tempCurrContent
        // boxer(tempCurrContent)
    }
    return (
        <Boxescss >
            <Sidebar progress={props.progress} filters={filters} applyFilters={applyFilters} setFilters={setFilters} setBoxWidth={setBoxWidth} />
            <div className={boxWidth ? 'boxwrapper' : 'panelwrapper'}>
                {boxes}
                <Morebutton><div className={showButton ? 'button' : 'button inactive'} onClick={() => setBoxes(boxes => ([...boxes, ...boxer()]))}>More</div></Morebutton>
            </div>
        </Boxescss>
    )
}

export default Boxes