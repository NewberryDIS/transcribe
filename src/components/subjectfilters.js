import React from 'react'
import styled from '@emotion/styled'

const Subjectwrapper = styled.div`
    .emphasis {
        font-weight: 700;
    }
    ul {
        padding: 15px 0 0 0;
        margin: 0;
    }
    li {
        cursor: pointer;
        margin: 1px;
        padding: 2px 5px 0 5px;
        line-height: 30px;
        list-style-type: none;
        // background-image: linear-gradient(to bottom, transparent 1px, black 2px); 
        // background-position: 0% 105%;
        // background-repeat: no-repeat;
        // background-size: 0% 3px;
        // transition: background-size .2s;
        // &:hover {
        //     background-size: 100% 3px;
        // }
        border: 1px solid transparent;
        &:hover {
            border: 1px solid #333;
        }
        color: black;
        text-decoration: none;
    }
`


const Subjectfilters = props => {
    const subjects = <li>here be subjects</li>
    return (
        <Subjectwrapper>
           <ul>
               <li className="emphasis">View All</li>
               <li>Family Life</li>
               <li>Diaries</li>
               <li>Westward</li>
               <li>Secrets</li>
               <li>Cool Tapes</li>
               <li>Badly Tuned Radio</li>
               <li>Weird people</li>
               <li>Poetics</li>
               <li>Absent Referents</li>
            </ul>
        </Subjectwrapper>
    )
}

export default Subjectfilters
