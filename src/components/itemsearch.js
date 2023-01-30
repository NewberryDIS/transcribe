import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFetch } from "../components/hooks";
import { Searchcss }from './searchcomponents'
import { IoIosSearch } from 'react-icons/io'


const ItemSearch = props => {
    const { itemid, qtext } = useParams()
    const history = useHistory()
    const dataUrl  = process.env.NODE_ENV === 'development' ? 'https://cors-anywhere.herokuapp.com/https://digital.newberry.org/transcribe/omeka/api/files?item=' + props.itemid : 'https://digital.newberry.org/transcribe/omeka/api/files?item=' + props.itemid
    const [input, setInput] = useState(qtext === null ? '' : qtext)
    const [ data, loading ] = useFetch(dataUrl)
    const handleChange = (e) => {
        setInput(e.target.value.toLowerCase())
    }
    let newUrl = '/item/' + itemid + '/search/' + input
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            submitSearch()
        }
    }
    const submitSearch = () => {
        props.setSearchTerm(input)
        history.push(newUrl)
    }
    const text = "Search this item's transcriptions..."
    return (
        
        <Searchcss className="wideSearch">
            <input className="searchInput" placeholder={text}  value={input} type="text" onKeyDown={handleKeyDown} onChange={(e) => handleChange(e)} />
            <button className="searchbutton" onClick={submitSearch}><IoIosSearch size="1.5rem" /></button>
        </Searchcss>
    )
}

export default ItemSearch