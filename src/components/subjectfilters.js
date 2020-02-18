import React, { Fragment } from 'react'
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
    select {
        font-family: ${fonts.sans};
        box-shadow: inset 0 0 10px rgba(0,42,85,0.5);
        border: 2px solid rgba(37,37,37,0.7);
        background: rgba(237,237,237,0.7);
        padding: 7px 5px 5px 5px;
        margin: 10px 0;
        height: 40px;
        line-height: 30px;
        font-size: 16px;
        width: 100%;
    }
    @media only screen 
        and (max-width : 750px) {
            .subjectlist {display: none;}
            .subjectdropdown {display: block;}
        }
    @media only screen 
        and (min-width : 750px) {
            .subjectlist {display: block;}
            .subjectdropdown {display: none;}
        }
`

const SubjectFilters = props => {
    const subjectArray = ["Family papers","Diaries","Women","World's Columbian Exposition","Travelers’ writings","Letters (Correspondence)","Records (Documents)","American Civil War (1861-1865)","Everett D. Graff Collection of Western Americana","U.S. Western Expansion","Indians of North America","Edward E. Ayer Manuscript Collection","Letters (Documents)"]
    const subjectList = subjectArray.sort().map((s, index) => {
        return <li key={index} onClick={() => props.setSubjFilter(s)}>{
            s === 'American Civil War (1861-1865)' ? 'Civil War' : 
            s === 'Letters (Correspondence)' ? 'Letters' : 
            // s === 'Letters (Documents)' ? 'Letters' : 
            s === 'Records (Documents)' ? 'Records' : 
            s}</li>
    })
        const subjectDropdown = subjectArray.sort().map((s,index) => <option key={index} value={s} >
            {   s === 'American Civil War (1861-1865)' ? 'Civil War' : 
                s === 'Letters (Correspondence)' ? 'Letters' : 
                // s === 'Letters (Documents)' ? 'Letters' : 
                s === 'Records (Documents)' ? 'Records' : 
                s
            }
            </option>
    )
    return (
            <Subjectcss>
                <div className="subjectlist">
                    <span>Select a subject...</span>
                    <ul>
                        {subjectList}
                    <li onClick={() => props.setSubjFilter('')} title="Reset Subject Filter">View All Items</li>
                    </ul>
                </div>
                <div className="subjectdropdown">
                    <select id="dropdownsubj" className="dropdown" name="dropdownsubj" defaultValue={''} onChange={(e) => props.setSubjFilter(e.target.value)}>
                        <option value={''}>Select a subject...</option>
                        {subjectDropdown}
                    </select>
                </div>
            </Subjectcss>
    )
}

export default SubjectFilters