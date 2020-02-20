import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Sidebar, { Dropdown } from './sidebar'
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

const scrollToRef = ref => ref.current.scrollIntoView({behavior: 'smooth'})
// truncates description to 200 characters, or first appearance of html
const truncator = t => t.indexOf('<') > -1 ? t.substring(0,t.indexOf('<')) + '...' : t
// removes diacritics, lowercases
const normalizeText = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

const Boxes = props => {
    const [ textFilter, setTextFilter ] = useState('')
    const [ dateFilter, setDateFilter ] = useState(undefined)
    const [ subjFilter, setSubjFilter ] = useState('')
    const [ langFilter, setLangFilter ] = useState('English')
    const [ currContent, setCurrContent ] = useState(props.allContent)
    const [ boxes, setBoxes ] = useState([])
    const [ enableButton, setEnableButton ] = useState(true)
    const qty = 4
    let resultCount = 0
    const firstLoad = useRef(true)
    const filterContent = () => {
        resultCount = 0
        let tempContent = props.allContent.filter(i => {
            let filters = {
                langF: false,
                textF: true,
                dateF: false,
                subjF: true
            }
            // if lang filter is found in item's lang list, return true
            filters.langF = i.lang.indexOf(langFilter) > -1 ? true : false
            // if the return value of filtertext is longer than 0, true
            filters.textF = filterText(textFilter, i.transcription).length > 0 ? true : false
            // if datefilter = initial value (1), include everything; otherwise if date is less than max and greater than min, include it; single value, 2-date range, and array of single dates (which may include a range, but hard to parse at this point)
            if (dateFilter === 1) {
                filters.dateF = true
            } else if (i.date.length === 1) {
                filters.dateF = i.date[0] >= filters.dateF && i.date[0] <= filters.dateF + 9 ? true : false
            } else if (i.date.length === 2) {
                filters.dateF = i.date[0] <= filters.dateF + 9 && i.date[1] >= filters.dateF ? true : false
            } else {
                for (let d in i.date){
                    filters.dateF = i.date[d] >= filters.dateF && i.date[d] <= filters.dateF + 9 ? true : false
                }
            }
            // if subjfilter is longer than 0, and the category does *not* include subjfilter, then don't include it; otherwise include it - logic is reversed to include potential for multiple selections
            filters.subjF = subjFilter.length > 0 ? i.category.indexOf(subjFilter) === -1 ? false : true : true
            // if all the filters resolve to true, then result is true, and item should not be removed from the array
            const result = filters.langF && filters.textF && filters.dateF && filters.subjF 
            resultCount = result ? resultCount++ : resultCount
            console.log(i.id + ': ' + i.title)
            return result
        })
        setCurrContent(tempContent)
        console.log(currContent)
    }
    const updateBoxes = () => {
        // const newContent = currContent.length > qty ? currContent.slice(boxes.length, (boxes.length - 1)+ qty)
        console.log(currContent.length )
        const newContent = currContent.length > qty ? currContent.slice(boxes.length, boxes.length + qty) : currContent
        // console.log(currContent )
        const newBoxes = boxify(newContent)
        const bothBoxes = boxes.concat(newBoxes)
        setBoxes(bothBoxes)
        if (boxes.length >= currContent.length){
            setEnableButton(false)
        } else {
            setEnableButton(true)
        }
    }
    function boxify(content) { 
        return content.map((i) => {
            const progress = { 
                count: i.count,
                transcount: i.transcount,
                percentTranscribed: Math.round(i.percentTranscribed, 2),
            }
            const desc = truncator(i.desc)
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/full/400,/0/default.jpg'
            let searchresults =  textFilter !== [] ? filterText(textFilter, i.transcription) : ''
            const returnDiv = textFilter.length !== 0 ? 
                <Rectangle setSubjFilter={setSubjFilter} category={i.category} progress={progress} key={i.id} id={i.id} textFilter={textFilter} title={i.title} text={desc} img={img} script={i.transcription} pages={searchresults}/>
                : <Box setSubjFilter={setSubjFilter} category={i.category} progress={progress} key={i.id} id={i.id} textFilter={textFilter} title={i.title} text={desc} img={img} script={i.transcription} /> 
            return returnDiv
        })
    }
    function filterText(needleArray, haystackArray){
        // console.log()
        let returnArray = []
        let found = true
        haystackArray.forEach(h => {
            let nonvar = needleArray.length > 0 ? 
                needleArray.forEach(n => {
                    const needle = normalizeText(n)
                    const haystack = normalizeText(h[1])
                    found = ( found && haystack.indexOf(needle) > -1) ? true : false
                }) : ''
            if (found) returnArray.push(h)
        })
        return returnArray
    }
    const pageTop = useRef(null)
    const executeScroll = () => scrollToRef(pageTop)
    useEffect(() => {
        filterContent()
        updateBoxes()
        props.setResultCount(resultCount)
        if(firstLoad.current){
            firstLoad.current = false
        } else {
            executeScroll()
        }
    }, [textFilter,
        dateFilter,
        subjFilter,
        langFilter])
    return (
        <Boxescss className="boxes" >
            { props.showDropdown ? <Dropdown 
                showSidebar={props.showSidebar}
                progress={props.progress} 
                resultCount={props.resultCount}
                textFilter={textFilter} setTextFilter={setTextFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                subjFilter={subjFilter} setSubjFilter={setSubjFilter}
                langFilter={langFilter} setLangFilter={setLangFilter}
            /> : 
            <Sidebar 
                showSidebar={props.showSidebar}
                progress={props.progress} 
                resultCount={props.resultCount}
                textFilter={textFilter} setTextFilter={setTextFilter}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                subjFilter={subjFilter} setSubjFilter={setSubjFilter}
                langFilter={langFilter} setLangFilter={setLangFilter}
            />}
            <Anchor ref={pageTop} />
                {boxes}
            <div  className='boxwrapper'>
                {console.log('boxes length: ' + boxes.length)}
                {boxes.length === 0 ? <Nothing >No results.</Nothing> :''}
                <Bluebutton><div className={enableButton ? 'button' : 'button inactive'} onClick={() => updateBoxes()}>More</div></Bluebutton>
            </div>
        </Boxescss>
    )
}

export default Boxes