import React, { useState, useEffect } from 'react'
import { CoreBox } from './csscomponents'

const RecentItem = () => {
    const [ item, setItem ] = useState('')
    const [ img, setImg ] = useState('')
    const getItem = () => {
        fetch('https://cors-anywhere.herokuapp.com/https://publications.newberry.org/transcription/mms-transcribe/recentdata.json')
            .then(response => response.json())
            .then(data => makeItem(data))
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
        setImg("http://publications.newberry.org/transcription/mms-transcribe/files/original/" + props.filename)
        let itemlink = "https://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/" + props.document_id + "/" + props.document_page_id + "#transcription"
        let transcript = transcriptor(props.comment)
        const returnItem = <>
            <h3>Most Recent Contribution:</h3>
            <div className="pixbox">
                <h4><a href={itemlink}>{props.document_title}</a></h4>
                <p>{transcript}</p>
            </div>
            <p><a href={itemlink}>Visit the page</a></p>
        </>
        setItem(returnItem)
    }
    useEffect(()=> {
        getItem()
    }, [])
    return (
        <CoreBox className="footercontent tweets" img={img}>
            {item}
        </CoreBox>

    )
}

export default RecentItem