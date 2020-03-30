import React, {useState} from 'react'
import withLocation from "../components/withLocation"
import Box from '../components/box'
import Sidebar from '../components/sidebar'

const content = require('../data/content.json')
const truncator = t => t.indexOf('<') > -1 ? t.substring(0,t.indexOf('<')) + '...' : t
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
    catFFunction: (catString, catFilter) => catFilter.length > 0 ? (catString.indexOf(catFilter) > -1 ? true : false ): false,
}

let SearchResults = ({ search }) => {
    const [ itemsToShow, setItemsToShow ] = useState(18)
    const [ filters, setFilters ] = useState({
        lang: search.lang === undefined ? 'English' : search.lang,
        cat: search.cat   === undefined ? '' : search.cat,
        date: search.date === undefined ? 1 : search.date,
        text: search.text === undefined ? '' : search.text,
    })
    let allContent = content['items'].sort((a,b) => (a.title > b.title) ? 1 : -1)
    allContent = allContent.sort((a,b) => ( a.percentTranscribed > b.percentTranscribed ) ? 1 : -1 )
    const filterContent = (content) => {
        const returnArray = content.filter(c => {
            let langResult = filterFunctions.langFFunction(c.lang, filters.lang)
            let dateResult = filterFunctions.dateFFunction(c.date, filters.date)
            let catResult = filterFunctions.catFFunction(c.category, filters.cat) 
            let returnValue = langResult && dateResult && catResult
            return returnValue
        })
        return returnArray
    }
    const boxify = content => {
        let counter = 0
        const boxedUpContent = content.map(c => {
            const boxProps = {
                id: c.id,
                title: c.title,
                progress: {
                    count: c.count,
                    transcount: c.transcount,
                    percentTranscribed: c.percentTranscribed,
                },
                category: c.category,
                desc: truncator(c.desc),
                img: c.image.indexOf('default.jpg') > -1 ? c.image.replace('/full/full/0/default.jpg','/square/400,/0/default.jpg') : c.image  + '/full/400,/0/default.jpg',
            }
            counter++
            // return  <Box boxProps={boxProps} key={counter} className={counter <= itemsToShow ? "item" : "item hide"} />
            return  <div boxProps={boxProps} key={counter} className={counter <= itemsToShow ? "item" : "item hide"} >{c.title}</div>
        })
        // props.setResultCount(boxedUpContent.length)
        return boxedUpContent
    }
    let filteredContent = filterContent(allContent)
    let boxedContent = boxify(filteredContent)
    const [ boxes, setBoxes ] = useState(boxedContent)
    console.log(boxes)
    return (
        <div>
            <Sidebar />
            thwump
            {boxes}
        </div>
    ) 
}

export default withLocation(SearchResults)