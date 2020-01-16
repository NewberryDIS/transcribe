import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Sidebar from './simplesidebar'
import Box from './box'

const Boxescss = styled.div`
    flex: 1;
    width: 100%;
    z-index: 1;
    display: flex;
    align-content: flex-end;
    flex-wrap: wrap;
    padding-top: 200px;
    // box-shadow: 0 5px 10px rgba(37,37,37,0.69);
    box-shadow: 0 0 8px rgba(37,37,37,1);
    .boxwrapper {
        flex: 1;
        width: calc(100% - 20vw);
        display: flex;
        align-content: flex-start;
        justify-content: space-evenly;
        flex-wrap: wrap;
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
    const qty = 9
    const [ boxWidth, setBoxWidth ] = useState(true)
    const [ textFilter, setTextFilter ] = useState('')
    const [ dateFilter, setDateFilter ] = useState(1)
    const [ subjFilter, setSubjFilter ] = useState('')
    const [ langFilter, setLangFilter ] = useState('English')
    const initialContent = filterContent()
    const [ filteredContent, setFilteredContent] = useState(initialContent)
    const initialBoxes = boxify(filteredContent.slice(0,qty))
    function boxify(content) { 
        return content.map((i) => {
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
            return <Box boxWidth={boxWidth} key={i.id} id={i.id} className="box" textFilter={textFilter} title={i.title} text={i.desc} img={img} script={i.transcription} />
        })
    }
    let resultCount = 0
    function filterContent() {
        resultCount = 0
        let tempCurrContent = props.currContent.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            langfilter = i.lang.indexOf(langFilter) > -1 ? true : false
            if (textFilter.length > 0){
                textfilter = i.transcription.toLowerCase().indexOf(textFilter) === -1 ? false : true
            }
            if ( dateFilter === 1) {
                datefilter = true
            } else if (i.date.length === 1){
                datefilter = i.date[0] >= dateFilter && i.date[0] <= dateFilter + 9 ? true : false
            } else if (i.date.length === 2) {
                datefilter = i.date[0] <= dateFilter + 9 && i.date[1] >= dateFilter ? true : false
            } else {
                for (let d in i.date){
                    datefilter = i.date[d] >= dateFilter && i.date[d] <= dateFilter + 9 ? true : false
                }
            }
            // the first one is probably going to work once we have subjects in the data, but it's untested; currently its just searcing in the description, which will probably always fail, so subjects is nonfunctional, but will not error
            if (subjFilter.length > 0){
                // subjfilter = i.subjects.indexOf(subjectFilter) === -1 ? false : true
                subjfilter = i.category.indexOf(subjFilter) === -1 ? false : true
            }
            const result = datefilter && langfilter && textfilter && subjfilter
            resultCount = result ? resultCount + 1 : resultCount
            return result
        })
        if (filteredContent !== undefined) {
            setFilteredContent(tempCurrContent)
        } else {
            return tempCurrContent
        }
    }
    const [showButton, setShowButton] = useState(true);
    const [boxes, setBoxes] = useState(initialBoxes)
    function rewriteContent(){
        const dblqty = boxes.length > 10 ? qty * 2 : qty
        // console.log('filteredcontent lenght: ' + filteredContent.length + '; qty: ' + qty + '; boxes.length: ' + boxes.length)
        const contentForBoxing = filteredContent.length > dblqty ? filteredContent.slice((boxes.length), boxes.length + dblqty) : filteredContent 
        console.log(boxes)
        const moreBoxes = boxify(contentForBoxing)
        setBoxes(boxes => [...boxes, ...moreBoxes]) 
        if (boxes && boxes.length >= filteredContent.length) {setShowButton(false)} else {setShowButton(true)}
    }
    function clicker() {
        // console.log(' ; textFilter: ' + textFilter +' ; dateFilter: ' + dateFilter +' ; subjFilter: ' + subjFilter +' ; langFilter: ' + langFilter )
    }
    useEffect(() => {
        filterContent()
        props.setResultCount(resultCount)
    }, [textFilter,
        dateFilter,
        subjFilter,
        langFilter])
    useEffect(() => {
        rewriteContent()
    }, [filteredContent])
    return (
        <Boxescss className="boxes" >
            <Sidebar 
                setBoxWidth={setBoxWidth} 
                boxWidth={boxWidth} 
                progress={props.progress} 
                resultCount={props.resultCount}
                textFilter={textFilter} setTextFilter={setTextFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                subjFilter={subjFilter} setSubjFilter={setSubjFilter}
                langFilter={langFilter} setLangFilter={setLangFilter}
            />
            <div className="boxwrapper">
                {boxes}
                <Morebutton><div className={showButton ? 'button' : 'button inactive'} onClick={() => rewriteContent()}>More</div></Morebutton>
            
            {/* <button onClick={clicker}>click</button> */}
            </div>
        </Boxescss>
    )
}

export default Boxes