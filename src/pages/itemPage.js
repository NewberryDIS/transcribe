import React, { useState } from 'react'
import styled from '@emotion/styled'
import Background from '../components/background'

const Itempagecss = styled.div`
    width: 100%
    overflow: hiddem;
    height: 100%;
    margin: 0;
`
const Itempage = () => {
    const [bgId, setBgId] = useState()
    const [bgNo, setBgNo] = useState()

    return (
        <Itempagecss>
            <Background setBgId={setBgId} setBgNo={setBgNo} />
            <div className="body">
                omeka image
                omeka textbox
                next prev nav
                thumbnails
            </div>
        </Itempagecss>
    )
}

export default Itempage