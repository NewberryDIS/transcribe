import React from 'react'
import styled from '@emotion/styled'

const Subjectcss = styled.div`
font-family: sans-serif;
    span {
        display: block;
        padding: 5px 5px 0 7px;
        height: 40px;
        line-height: 40px;
    }
    ul {
        padding: 0 7px;
        margin: 0;
        list-style-type: none;
    }
    li {
        &:last-of-type {
            font-weight: 900;
        }
        cursor: pointer;
        border: 1px solid transparent;
        transition: border 0.1s;
        &:hover {
            border: 1px solid #333;
        }
        padding: 5px;
    }
`

const SubjectFilters = props => {
    const subjectarray = ['Family Life','Diaries','Westward','Secrets','Cool Tapes','Badly Tuned Radio','Weird people','Poetics','Absent Referents']
    const subjectlist = subjectarray.map((s, index) => {
        return <li key={index}>{s}</li>
    })
    return (
        <Subjectcss>
            <span>Select a subject...</span>
           <ul>
               {subjectlist}
               <li>View All Items</li>
            </ul>
        </Subjectcss>
    )
}

export default SubjectFilters