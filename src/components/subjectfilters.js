import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './styles'

const Subjectcss = styled.div`
    font-family: ${fonts.sans};
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
            border: 1px solid rgba(${colors.hl}, 1);
        }
        padding: 5px;
    }
`

const SubjectFilters = props => {
    const subjectarray = ["Family papers","Diaries","Women","World's Columbian Exposition","Travelers’ writings","Letters (Correspondence)","Records (Documents)","American Civil War (1861-1865)","Everett D. Graff Collection of Western Americana","U.S. Western Expansion","Indians of North America","Edward E. Ayer Manuscript Collection","Letters (Documents)"]
    const subjectlist = subjectarray.sort().map((s, index) => {
        return <li key={index} onClick={() => props.setSubjFilter(s)}>{s}</li>
    })
    return (
        <Subjectcss>
            <span>Select a subject...</span>
            <ul>
               {subjectlist}
               <li onClick={() => props.setSubjFilter('')} title="Reset Subject Filter">View All Items</li>
            </ul>
        </Subjectcss>
    )
}

export default SubjectFilters