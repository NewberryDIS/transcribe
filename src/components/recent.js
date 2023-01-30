import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CoreBox, fonts, colors } from './csscomponents'

const RecentItemCss = styled.div`
    .pixbox {
        background:linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('${props => props.img}');
        padding: 20px;
        border: 2px solid rgba(${colors.hl}, 1);
        box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
        position: relative;
        background-position: center;
        h4 {
            font-size: 1.2rem;
            font-family: ${fonts.serif};
        }
        margin-bottom: 20px;
    }
`

const RecentItem = () => {
    const [ item, setItem ] = useState('')
    const [ img, setImg ] = useState('')
    const getItem = () => {
        // console.log('firing')
        let recentDataurl = process.env.NODE_ENV === 'development' ? 'https://cors-anywhere.herokuapp.com/https://digital.newberry.org/transcribe/omeka/recentdata.json' : 'https://digital.newberry.org/transcribe/omeka/recentdata.json'
        fetch(recentDataurl)
            .then(response => response.json())
            .then(data => makeItem(data));
    }
    const transcriptor = t => {
        let returnt = t.replace("Created page with ","");
        var first = returnt.charAt(1),
            maxlength = 340;

        if (first === first.toLowerCase() && first !== first.toUpperCase()) {
            returnt = returnt.substr(returnt.indexOf(".")+2, returnt.length);
        }
        if (returnt.length > maxlength) {
            returnt = returnt.substr(0,maxlength);
            returnt = returnt.substr(0, Math.min(returnt.length, returnt.lastIndexOf(" ")));
        }
        if (returnt.charAt(returnt.length - 2) !== '.') {
            returnt = returnt.substr(0,returnt.length - 1) + '...';
        }
        return returnt
    }
    const makeItem = props => {
        setImg("http://digital.newberry.org/transcribe/omeka/files/original/" + props.filename)
        let itemlink = "https://digital.newberry.org/transcribe/omeka/item/" + props.document_id + "/page/" + props.document_page_id
        let transcript = transcriptor(props.comment)
        const returnItem = <CoreBox className="footercontent tweets">
            <h3>Most Recent Contribution:</h3>
            <div className="pixbox">
                <h4><a href={itemlink} target="_blank" rel="noopener noreferrer">{props.document_title}</a></h4>
                <p>{transcript}</p>
            </div>
            <p><a href={itemlink} target="_blank" rel="noopener noreferrer">Visit the page</a></p>
        </CoreBox>
        setItem(returnItem)
    }
    useEffect(()=> {
        getItem()
    }, [])
    return (
        <RecentItemCss img={img}>
            {item}
        </RecentItemCss>

    )
}

export default RecentItem