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
        align-content: space-between;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
`

const Boxes = props => {
    const qty = 18
    const [ boxWidth, setBoxWidth ] = useState(true)
    const [ filters, setFilters ] = useState(['', [1600, 2020], '','English'])
    const initialContent = filterContent(props.currContent)
    const [ filteredContent, setFilteredContent] = useState(initialContent)
    const initialBoxes = boxify(filteredContent.slice(0,qty))
    function boxify(content) { 
        return content.map((i, index) => {
            const img = i.image.indexOf('default.jpg') > -1 ? i.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : i.image  + '/square/400,/0/default.jpg'
            return <Box boxWidth={boxWidth} key={i.id} className="box" title={i.title} text={i.desc} img={img} filters={filters} script={i.transcription} />
        })
    }
    function filterContent(){
        let resultCount = 0
        let tempCurrContent = props.currContent.filter(function(i) {
            let langfilter = false,
                textfilter = true,
                datefilter = false,
                subjfilter = true
            langfilter = i.lang.indexOf(filters[3]) > -1 ? true : false
            if (filters[0].length > 0){
                textfilter = i.transcription.toLowerCase().indexOf(filters[0]) === -1 ? false : true
            }
            if (i.date.length === 1){
                datefilter = i.date[0] >= filters[1][0] && i.date[0] <= filters[1][1] ? true : false
            } else if (i.date.length === 2) {
                datefilter = i.date[0] <= filters[1][1] && i.date[1] >= filters[1][0] ? true : false
            } else {
                for (let d in i.date){
                    datefilter = i.date[d] >= filters[1][0] && i.date[d] <= filters[1][1] ? true : false
                }
            }
            // the first one is probably going to work once we have subjects in the data, but it's untested; currently its just searcing in the description, which will probably always fail, so subjects is nonfunctional, but will not error
            if (filters[2].length > 0){
                // subjfilter = i.subjects.indexOf(filters.subjectFilter) === -1 ? false : true
                subjfilter = i.desc.indexOf(filters[2]) === -1 ? false : true
            }
            const result = datefilter && langfilter && textfilter && subjfilter
            resultCount = result ? resultCount + 1 : resultCount
            return result
        })
        if (filteredContent !== undefined) {
            console.log('filtered content is not undefined')
            // console.log(filters)
            // console.log('results: ' + resultCount + '; filtered content length :  ' + filteredContent.length)
            setFilteredContent(tempCurrContent)

            // console.log(tempCurrContent)
            // console.log(filteredContent)
        } else {
            return tempCurrContent
        }
    }
    const [boxes, setBoxes] = useState(initialBoxes)
    function rewriteContent(){
        // const slicePoint = boxes != undefined ? boxes.length - 1 : 0
        // const contentForBoxing = slicePoint > (filteredContent - qty) ? filteredContent : filteredContent.slice(slicePoint, slicePoint + qty)
        const contentForBoxing = filteredContent.length > qty ? filteredContent.slice(0, (boxes.length - 1) + qty) : filteredContent 
        // console.log('contentForBoxing lenght: ' + contentForBoxing.length)
        setBoxes(() => boxify(contentForBoxing))
        // setMovies(prevMovies => ([...prevMovies, ...result]));
    }
    function clicker() {
        console.log(filters)
    }
    useEffect(() => {
        const filtersUseEffect = () => {
            filterContent()
        }
        console.log('filters have been updated, so were filtering the content')
    }, [filters])
    useEffect(() => {
            filterContent()
        console.log('filters have been updated, so were filtering the content')
    }, [filters])
    useEffect(()=>{
        console.log('filltered content was updated, so were rewriting the boxes')
        rewriteContent()
    }, [filteredContent])
    return (
        <Boxescss className="boxes" >
            <Sidebar setBoxWidth={setBoxWidth} boxWidth={boxWidth} filters={filters} setFilters={setFilters} progress={props.progress} />
            <div className="boxwrapper">
                {boxes}
            </div>
            <button onClick={clicker}>click</button>
        </Boxescss>
    )
}

export default Boxes