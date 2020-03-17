import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Sidebar, { Dropdown } from './sidebar'
import { fonts, colors } from './styles'
import Box from './box'
import Rectangle from './rectangle'
import Bluebutton from './bluebutton'
import Tsrbox from './tsrbox'

const Boxescss = styled.div`
    flex: 1;
    position: relative;
    z-index: -1;
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
        margin-left: 40px;
        margin-right: 40px;
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
    const [ filteredContent, setFilteredContent] = useState(props.allContent)
    function boxify(content) { 
        return content.map((i) => {
            if(i.transcount === `undefined`){
                console.log(i.title)
            }
            const progress = { 
                count: i.count,
                transcount: i.transcount,
                percentTranscribed: i.percentTranscribed,
            }
            const desc = truncator(i.desc)
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/full/400,/0/default.jpg'
            let searchresults =  textFilter !== [] ? filterText(textFilter, i.pages, i.title) : ''
            const returnDiv = textFilter.length !== 0 ? 
                <Tsrbox setSubjFilter={setSubjFilter} category={i.category} progress={progress} key={i.id} id={i.id} textFilter={textFilter} title={i.title} text={desc} img={img} searchresults={searchresults}/>
                : <Box setSubjFilter={setSubjFilter} category={i.category} progress={progress} key={i.id} id={i.id} textFilter={textFilter} title={i.title} text={desc} img={img} /> 
            return returnDiv
        })
    }
    function filterText(nn, hh, t){ 
        let returnArray = []
        let found = true
        let titleFound = true
        let foundIndex, titleFoundIndex
        nn.length > 0 && nn.forEach(n => {
            const needle = normalizeText(n)
            const haystack = normalizeText(t)
            titleFoundIndex = haystack.indexOf(needle)
            titleFound = ( titleFound && haystack.indexOf(needle) > -1) ? true : false
        })
        hh.forEach(h => {
            if (h.transcription.length > 0 && nn.length > 0 ) { 
                nn.forEach(n => {
                    const needle = normalizeText(n)
                    const haystack = normalizeText(h.transcription)
                    foundIndex = haystack.indexOf(needle) 
                    found = ( found && haystack.indexOf(needle) > -1) ? true : false
                })
                if (found || (titleFound )) {returnArray.push(h)}
            }
        }) 
        return returnArray
    }
    const pageTop = useRef(null)
    function filterContent() {
        resultCount = 0
        let tempContent = props.allContent.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            langfilter = i.lang.indexOf(langFilter) > -1 ? true : false
            if (textFilter.length > 0){
                textfilter = filterText(textFilter, i.pages, i.title).length > 0 ? true : false
            }
            if ( dateFilter === 1) {
                datefilter = true
            } else if ( dateFilter === 1799){
                datefilter = i.date[0] < 1799 ? true : false
            } else if (i.date.length === 1){
                datefilter = i.date[0] >= dateFilter && i.date[0] <= dateFilter + 9 ? true : false
            } else if (i.date.length === 2) {
                datefilter = i.date[0] <= dateFilter + 9 && i.date[1] >= dateFilter ? true : false
            } else {
                for (let d in i.date){
                    datefilter = i.date[d] >= dateFilter && i.date[d] <= dateFilter + 9 ? true : false
                }
            }
            if (subjFilter.length > 0){
                subjfilter = i.category.indexOf(subjFilter) === -1 ? false : true
            }
            const result = datefilter && langfilter && textfilter && subjfilter
            resultCount = result ? resultCount + 1 : resultCount
            return result
        })
        setFilteredContent(tempContent)
    }
    const [showButton, setShowButton] = useState(true);
    const [boxes, setBoxes] = useState([])
    function rewriteContent(){
        const contentForBoxing = filteredContent.length > qty ? filteredContent.slice(boxes.length, boxes.length + qty) : filteredContent 
        const newBoxes = boxify(contentForBoxing)
        setBoxes(newBoxes) 
        if (boxes.length >= filteredContent.length) {setShowButton(false)} else {setShowButton(true)}
    }
    function addBoxes(){
        console.log('adding boxes...')
        boxes.length < qty ? console.log('not many boxes') : console.log('many boxes')
        let addContent = boxes.length < qty ? filteredContent.slice(boxes.length, (boxes.length + qty) - boxes.length) : filteredContent.slice(boxes.length, boxes.length + qty)
        let addBoxes = boxify(addContent)
        let tempBoxes = boxes.concat(addBoxes)
        setBoxes(tempBoxes)
        if (boxes.length >= filteredContent.length) {setShowButton(false)} else {setShowButton(true)}
    }
    const firstLoad = useRef(true);
    const executeScroll = () => scrollToRef(pageTop)
    useEffect(() => {
        filterContent()
        props.setResultCount(resultCount)
        console.log(
            'textFilter: ' + textFilter +
            ' ; dateFilter: ' + dateFilter +
            ' ; subjFilter: ' + subjFilter +
            ' ; langFilter: ' + langFilter + 
            ' ; boxes length: ' + boxes.length
            )
        if (firstLoad.current)  {
            firstLoad.current = false
        } else {
            // console.log(boxes.length + ' is less than ' + qty)
            if (boxes.length < qty){ addBoxes()}
            // console.log(boxes.length)

            executeScroll()
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
            { props.showDropdown ? <Dropdown 
                showSidebar={props.showSidebar}
                setBoxWidth={setBoxWidth} 
                boxWidth={boxWidth} 
                progress={props.progress} 
                resultCount={props.resultCount}
                textFilter={textFilter} setTextFilter={setTextFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                subjFilter={subjFilter} setSubjFilter={setSubjFilter}
                langFilter={langFilter} setLangFilter={setLangFilter}
            /> : ''}
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