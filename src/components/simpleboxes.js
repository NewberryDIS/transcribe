import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Sidebar from './simplesidebar'
import { fonts, colors } from './styles'
import Box from './box'
import Rectangle from './rectangle'
import Bluebutton from './bluebutton'

const Boxescss = styled.div`
    flex: 1;
    z-index: 1;
    align-content: flex-end;
    flex-wrap: wrap;
    padding-top: 60vh;
    // padding-top: 10vh;
    margin-top: 50px;
    // box-shadow: 0 5px 10px rgba(37,37,37,0.69);
    // box-shadow: 0 0 8px rgba(37,37,37,1);
    .boxwrapper {
        flex: 1;
        width: calc(90% - var(--width));
        display: flex;
        align-content: flex-start;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    // sizes
    @media only screen and (min-width: 1200px){
        --width: 20vw;
        display: flex;
    }
    @media only screen and (max-width: 1200px){
        --width: 35vw;
        display: flex;
    }
    @media only screen and (max-width: 750px){
        --width:  45vw;
    }       
`
const Anchor = styled.div`
    position: absolute;
    top: 50vh;
    width: 5px;
    height: 5px;
    background: black;
    opacity: 0;
`
const Nothing = styled.div`
    font-family: 'Crimson Text',serif;
    box-shadow: inset 0 0 10px rgba(37,37,37,1);
    margin: 5vmin;
    padding: 7vmin 10vmin;
    background: rgba(${colors.bg}, 1);
    border: 1px solid rgba(${colors.fg}, 1);
    color: rgba(${colors.fg}, 1);
    font-size: 1.25rem;
`
// const scrollToRef = (ref) => window.scrollTo(0, (ref.current.offsetTop - 50))  
const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'})
// truncates description to 200 characters, or first appearance of html
const truncator = t => t.indexOf('<') > -1 ? t.substring(0,t.indexOf('<')) + '...' : t
// removes diacritics, lowercases
const normalizeText = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
const Boxes = props => {
    const qty = 18
    const [ boxWidth, setBoxWidth ] = useState(true)
    const [ textFilter, setTextFilter ] = useState([])
    const [ dateFilter, setDateFilter ] = useState(1)
    const [ subjFilter, setSubjFilter ] = useState('')
    const [ langFilter, setLangFilter ] = useState('English')
    let resultCount = 0
    const initialContent = () => { 
        let tempCurrContent = props.currContent.filter(function(i) {
            let langfilter = false
            langfilter = i.lang.indexOf(langFilter) > -1 ? true : false
            return langfilter
        })
        return tempCurrContent
    }
    const [ filteredContent, setFilteredContent] = useState(initialContent)
    const initialBoxes = boxify(filteredContent.slice(0,qty))
    function boxify(content) { 
        return content.map((i) => {
            const progress = { 
                count: i.count,
                transcount: i.transcount,
                percentTranscribed: i.percentTranscribed,
                // totalcomplete: Math.round((i.pc / 100) * i.count),
                // pnr: i.pnr,
                // totalcomplete: Math.min(100, Math.round((i.pc / 100) * i.count), 0),
                // total: i.count,
                // percentComplete: i.pc === '' ? 0 : i.pc
            }
            const desc = truncator(i.desc)
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/full/400,/0/default.jpg'
            let searchresults =  textFilter !== [] ? filterText(textFilter, i.transcription) : ''
            const returnDiv = textFilter.length !== 0 ? 
                <Rectangle setSubjFilter={setSubjFilter} category={i.category} progress={progress} boxWidth={boxWidth} key={i.id} id={i.id} boxWidth={boxWidth} textFilter={textFilter} title={i.title} text={desc} img={img} script={i.transcription} pages={searchresults}/>
                : <Box setSubjFilter={setSubjFilter} category={i.category} progress={progress} boxWidth={boxWidth} key={i.id} id={i.id} boxWidth={boxWidth} textFilter={textFilter} title={i.title} text={desc} img={img} script={i.transcription} /> 
            return returnDiv
        })
    }
    function filterText(nn, hh){
        // console.log()
        let returnArray = []
        let found = true
        hh.forEach(h => {
            let nonvar = nn.length > 0 ? 
            nn.forEach(n => {
                const needle = normalizeText(n)
                const haystack = normalizeText(h[1])
                found = ( found && haystack.indexOf(needle) > -1) ? true : false
            }) : ''
            if (found) returnArray.push(h)
        })
        return returnArray
    }
    const pageTop = useRef(null)
    function filterContent() {
        resultCount = 0
        let tempCurrContent = props.currContent.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            langfilter = i.lang.indexOf(langFilter) > -1 ? true : false
            if (textFilter.length > 0){
                textfilter = filterText(textFilter, i.transcription).length > 0 ? true : false
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
        setFilteredContent(tempCurrContent)
    }
    const [showButton, setShowButton] = useState(true);
    const [boxes, setBoxes] = useState(initialBoxes)
    function rewriteContent(){
        const contentForBoxing = filteredContent.length > qty ? filteredContent.slice(boxes.length, boxes.length + qty) : filteredContent 
        const newBoxes = boxify(contentForBoxing)
        setBoxes(newBoxes) 
        if (boxes.length >= filteredContent.length) {setShowButton(false)} else {setShowButton(true)}
    }
    function clicker() {
        // console.log(' ; textFilter: ' + textFilter +' ; dateFilter: ' + dateFilter +' ; subjFilter: ' + subjFilter +' ; langFilter: ' + langFilter )
    }
    function addBoxes(){
        const addContent = filteredContent.slice(boxes.length, boxes.length + qty)
        const addBoxes = boxify(addContent)
        setBoxes([...boxes, addBoxes] )
        if (boxes.length >= filteredContent.length) {setShowButton(false)} else {setShowButton(true)}
    }
    const firstLoad = useRef(true);
    const executeScroll = () => scrollToRef(pageTop)
    useEffect(() => {
        filterContent()
        props.setResultCount(resultCount)
        console.log(resultCount)
        if (firstLoad.current) {
            firstLoad.current = false
            console.log('ts not happeningn yet')
        } else if (!firstLoad.current) {
            executeScroll()
            console.log('ts happeningn')
        }
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
                showSidebar={props.showSidebar}
                setBoxWidth={setBoxWidth} 
                boxWidth={boxWidth} 
                progress={props.progress} 
                resultCount={props.resultCount}
                textFilter={textFilter} setTextFilter={setTextFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                subjFilter={subjFilter} setSubjFilter={setSubjFilter}
                langFilter={langFilter} setLangFilter={setLangFilter}
            />
            <Anchor ref={pageTop} />
            <div  className={boxWidth ? 'boxwrapper' : 'boxwrapper wide'}>
                {boxes}
                {boxes.length === 0 ? <Nothing >No results.</Nothing> :''}
                <Bluebutton><div className={showButton ? 'button' : 'button inactive'} onClick={() => addBoxes()}>More</div></Bluebutton>
            </div>
        </Boxescss>
    )
}

export default Boxes