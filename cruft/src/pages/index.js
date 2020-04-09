import React, { useState } from 'react'
import Jumbo from '../components/jumbo'
// import Background from '../components/background'
import Boxes from '../components/boxes'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import Footer from '../components/footer'
import Topbar from '../components/topbar'


const bgarray = [
    ['nby_0BH40','1'],
    ['nby_1BH1504','1'],
    ['nby_1BH1507','1'],
    ['nby_1BH1574','1'],
    ['nby_1BH2115','1'],
    ['nby_1BH2128','1'],
    ['nby_1BH2450','1'],
    ['nby_1BH2469','1'],
    ['nby_2B268','1'],
    ['nby_2BH695','1'],
    ['nby_3B344','1'],
    ['nby_3BH803','1'],
    ['nby_4BH27','1'],
    ['nby_4BH454','1'],
    ['nby_4BH789','1'],
    ['nby_BB28','1'],
    ['nby_VO184','1'],
    ['nby_LL10651','0'],
    ['nby_LL10834','0'],
    ['nby_LL10839','0'],
    ['nby_LL11503','0'],
    ['nby_LL12011','0'],
    ['nby_LL13424','0'],
    ['nby_LL9161','0'],
    ['nby_VO1422','0']
]

export const Indexcss = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
`
const Bodycss = styled.div`
z-index: -9990;
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: url(${props => `//iiif.archivelab.org/iiif/` + props.bg + `/full/1000,/0/default.jpg` });
// background: url(${props => props.bg});
background-size: cover;
background-position: 50% 50%;
overflow: hidden;
.bglink {
    z-index: 999;
}

`
//300,100,2000,2500/1000,/
const content = require('../data/content.json')

const Index = props => {
    const { search } = props.location
    const date = search.substr(search.indexOf('=') + 1 )
    // let bgLink, bgText, aLink
        
    let allContent = content['items'].sort((a,b) => (a.title > b.title) ? 1 : -1)
    allContent = allContent.sort((a,b) =>(a.percentTranscribed > b.percentTranscribed) ? 1 : -1 )
    const [ resultCount, setResultCount ] = useState(0)
    const [ showDropdown, setShowDropdown ] = useState(false)
    const [ bgLink, setBgLink ] = useState('')
    const [ bgText, setBgText ] = useState('')
    const [ aLink, setALink ] = useState('')
    return (
        <Indexcss >
            <Global styles={css`
                html, body {
                    margin: 0;
                    padding: 0;
                    position: relative;
                    z-index: 1;
                }
            `}/>
            <Topbar setShowDropdown={setShowDropdown} showDropdown={showDropdown} resultCount={resultCount} />
            <Jumbo />
            <Background 
                setBgLink={setBgLink}
                setBgText={setBgText}
                setALink={setALink} 
            />
            {/* <Background bgId={bgId} setBgId={setBgId} setBgNo={setBgNo} /> */}
            <Boxes showDropdown={showDropdown} setResultCount={setResultCount} resultCount={resultCount} allContent={allContent} progress={content['summary']}/>
            <Footer
                bgLink={bgLink}
                bgText={bgText}
                aLink={aLink}
            />
        </Indexcss>
    )
}

class Background extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.bgLink != this.props.bgLink
    }
    componentDidMount() {
        bgarray.forEach((picture) => {
            const img = new Image();
            img.src = `//iiif.archivelab.org/iiif/` + picture[0] + `$` + picture[1] + `/full/1000,/0/default.jpg`
            //iiif.archivelab.org/iiif/` + props.bg + `/full/1000,/0/default.jpg
        });
    }
    render(){
        const rando = Math.round(Math.random() * (bgarray.length - 1));
        const bodybg = bgarray[rando]
        const bgLink = bodybg[0] + `$` + bodybg[1]
        const bgText = 'https://cors-anywhere.herokuapp.com/http://archive.org/metadata/' + this.bgLink + '/metadata/title'
        const aLink = '//archive.org/details/' + bgLink + '/mode/1up'
        console.log(bgLink)
        const settingBgLink = this.props.setBgLink(bgLink)
        const settingBgTitle = this.props.setBgText(bgText)
        const settingBgAlink = this.props.setALink(aLink)
        return(
            <Bodycss bg={bgLink} />
        )
    }

}
export default Index