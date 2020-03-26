import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './styles'
import { Selectcss } from './sidebar'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

const Subjectcss = styled.div`
    font-family: ${fonts.sans};
    span {
        display: block;
        padding: 5px 5px 0 7px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-transform: uppercase;
        // padding-top: 6px;
        // padding-left: 3px;
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
        font-size: 12px;
        text-align: left;
        text-transform: uppercase;
        padding: 2px 0;
        // padding-left: 3px;
        button {
            border: 1px solid transparent;
            transition: border 0.1s;
            &:hover {
                border: 1px solid rgba(${colors.hl}, 1);
            }
            width: 100%;
            font-family: ${fonts.sans};
            font-size: 12px;
            text-align: left;
            text-transform: uppercase;
            // border: 0;
            background: rgba(0,0,0,0);
            margin: 0;
        }
        &.viewall {
            padding-left: 4px;
            padding-top: 10px;
        }
    }
    .icon {
        vertical-align: middle;
        margin-right: 4px;
    }
    @media (max-width: 850px) {
        .subjectlist {display: none;}
        .subjectdropdown {display: block;}
    }
    @media (min-width: 850px) {
        .subjectlist {display: block;}
        .subjectdropdown {display: none;}
    }
    @media (max-height: 600px) {
        .subjectlist {display: none;}
        .subjectdropdown {display: block;}
    }
    @media (min-height: 600px) {
        .subjectlist {display: block;}
        .subjectdropdown {display: none;}
    }
`

// only one media query is being applied (height, here)

const SubjectFilters = props => {
    const subjectArray = [
        // "Cassettes",
        "Family papers",
        "Diaries",
        "Women",
        "World's Columbian Exposition",
        "Travelers’ writings",
        "Letters (Correspondence)",
        "Records (Documents)",
        "American Civil War (1861-1865)",
        // "Everett D. Graff Collection of Western Americana",
        "U.S. Western Expansion",
        "Indians of North America",
        // "Edward E. Ayer Manuscript Collection",
    ]
    const subjectList = subjectArray.sort().map((s, index) => {
        return <li key={index}><button onClick={() => props.setFilters({...props.filters, subjFilter: s})}>
            {props.subjFilter.indexOf(s) > -1 ? <MdCheckBox className="icon" /> : <MdCheckBoxOutlineBlank className="icon" />}
            {
                s === 'American Civil War (1861-1865)' ? 'Civil War' : 
                s === 'Letters (Correspondence)' ? 'Letters' : 
                s === 'Records (Documents)' ? 'Records' : 
                s === 'Indians of North America' ? 'American Indians and Indigenous peoples' :
                s
            }</button>
        </li>
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
                    <span>Select a category...</span>
                    <ul>
                        {subjectList}
                    <li className="viewall" onClick={() => props.setSubjFilter('')} title="Reset Subject Filter">View All Items</li>
                    </ul>
                </div>
                <div className="subjectdropdown">
                    <Selectcss id="dropdownsubj" className="dropdown" name="dropdownsubj" defaultValue={''} onChange={(e) => props.setSubjFilter(e.target.value)}>
                        <option value={''}>Select a subject...</option>
                        {subjectDropdown}
                    </Selectcss>
                </div>
            </Subjectcss>
    )
}

export default SubjectFilters