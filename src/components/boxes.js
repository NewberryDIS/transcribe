import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Sidebar, { Dropdown } from './sidebar'
import { fonts, colors } from './styles'
import Box from './box'
import { Bluebutton } from './csscomponents'
import Tsrbox from './tsrbox'


const Anchor = styled.div`
    position: absolute;
    top: 50vh;
    width: 5px;
    height: 5px;
    background: black;
    opacity: 0;
`

const NoResults = styled.div`
    font-family: 'Crimson Text',serif;
    box-shadow: inset 0 0 10px rgba(37,37,37,1);
    margin: 5vmin;
    padding: 7vmin 10vmin;
    background: rgba(${colors.bg}, 1);
    border: 1px solid rgba(${colors.fg}, 1);
    color: rgba(${colors.fg}, 1);
    font-size: 1.25rem;
`

const Boxescss = styled.div`
    // background: blue;
    .item {
        background: #ccc;
        border: 2px solid #999;
        margin: 5px auto;
        padding: 5px;
        width: 50%;
    }
    .hide {display: none }
`

// const filterFunction = (needles, haystacks, resultCount) => {
//     resultCount = 0
const filterFunctions = {
    langFFunction: (langString, langFilter) => langString.indexOf(langFilter) > -1 ? true : false,
    dateFFunction: (dateArray, dateFilter) => {
        if ( dateFilter === 1 ) return true
        else if ( dateFilter === 1799 && dateArray[0] < 1799 ) return true
        else if ( dateArray.length === 1 && dateArray[0] >= dateFilter && dateArray[0] <= (dateFilter + 9) ) return true
        else if ( dateArray.length === 2 && dateArray[0] <= (dateFilter + 9) && dateArray[1] >= dateFilter ) return true
        else {
            let response = false
            for (let d in dateArray){
                if ( dateArray[d] >= dateFilter && dateArray[d] <= (dateFilter + 9) ) response = true
            }
            return response
        }
    },
    subjFFunction: (subjString, subjFilter) => subjFilter.length > 0 ? (subjString.indexOf(subjFilter) > -1 ? true : false ): false,
}

const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'})

const Boxes = props => {
    const [ filters, setFilters ] = useState({
        textFilter: '',
        dateFilter: 1,
        subjFilter: '',
        langFilter: 'English',
    })
    const [ itemsToShow, setItemsToShow ] = useState(18)
    const filterContent = (content) => {
        const returnArray = content.filter(c => {
            let returnValue = false
            if (filterFunctions.langFFunction(c.lang, filters.langFilter) ) {
                // console.log('lang filter = yes')
                returnValue = true
            }
            if (filterFunctions.dateFFunction(c.date, filters.dateFilter) ) {
                // console.log('date filter = yes')
                returnValue = true
            }
            if (filterFunctions.subjFFunction(c.category, filters.subjFilter) )  {
                // console.log('subj filter = yes')
                returnValue = true
            }
            // returnValue && resultCount++
            // console.log(resultCount)
            return returnValue
            // if (filterFunctions.langFFunction(c.lang, filters.langFilter) &&
            // filterFunctions.dateFFunction(c.date, filters.dateFilter) &&
            // filterFunctions.subjFFunction(c.subj, filters.subjFilter) ) return true 
            // else return false
        })
        return returnArray
    }
    const [ showButton, setShowButton ] = useState(true)
    const boxify = content => {
        let counter = 0
        const boxedUpContent = content.map(c => {
            counter++
            return  <div className={counter <= itemsToShow ? "item" : "item hide"}>{counter}: {c.title}</div>
        })
        props.setResultCount(boxedUpContent.length)
        return boxedUpContent
    }
    let filteredContent = filterContent(props.allContent)
    let boxedContent = boxify(filteredContent)
    const initialContent = filterContent(props.allContent)
    const initialBoxes = boxify(initialContent)
    const [ boxes, setBoxes ] = useState(boxedContent)
    const pageTop = useRef(null)
    const addBoxes = () => {
        setItemsToShow(itemsToShow + 18)
    }
    const updateContent = () => {
        filteredContent = filterContent(props.allContent)
        boxedContent = boxify(filteredContent)
        setBoxes(boxedContent)
    }
    const firstLoad = useRef(true);
    const executeScroll = () => scrollToRef(pageTop)
    useEffect(() => {
        setItemsToShow(18)
        updateContent()
        if (firstLoad.current)  {
            firstLoad.current = false
        } else {
            executeScroll()
        }
    }, [filters])
    useEffect(() => {
        updateContent()
        setShowButton(boxedContent.length < itemsToShow ? false : true)
    }, [itemsToShow])
    return (
        <Boxescss>
            {props.showDropdown ? 
                <Dropdown 
                    progress={props.progress} 
                    resultCount={props.resultCount}
                    filters={filters} setFilters={setFilters} /> :
                
                <Sidebar 
                    progress={props.progress} 
                    resultCount={props.resultCount}
                    filters={filters} setFilters={setFilters} />
            }
        <Anchor ref={pageTop} />
        {boxes}
        {boxes.length === 0 ? <NoResults>No results.</NoResults>:''}
        <Bluebutton>
            <div className={showButton ? 'button' : 'button inactive'} onClick={() => addBoxes()}>More</div>
        </Bluebutton>
        </Boxescss>
    )
}

export default Boxes