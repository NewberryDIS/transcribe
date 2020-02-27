import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'

// import nby0BH40 from '../images/nby_0BH40_0000.jpg'
// import nby1BH1504 from '../images/nby_1BH1504_0001.jpg'
// import nby1BH1507 from '../images/nby_1BH1507_0001.jpg'
// import nby1BH1574 from '../images/nby_1BH1574_0000.jpg'
// import nby1BH2115 from '../images/nby_1BH2115_0001.jpg'
// import nby1BH2128 from '../images/nby_1BH2128_0001.jpg'
// import nby1BH2450 from '../images/nby_1BH2450_0001.jpg'
// import nby1BH2469 from '../images/nby_1BH2469_0000.jpg'
// import nby2B268 from '../images/nby_2B268_0000.jpg'
// import nby2BH695 from '../images/nby_2BH695_0001.jpg'
// import nby3B344 from '../images/nby_3B344_0000.jpg'
// import nby3BH803 from '../images/nby_3BH803_0001.jpg'
// import nby4BH27 from '../images/nby_4BH27_0000.jpg'
// import nby4BH454 from '../images/nby_4BH454_0001.jpg'
// import nby4BH789 from '../images/nby_4BH789_0000.jpg'
// import nbyBB28 from '../images/nby_BB28_0000.jpg'
// import nbyLL10651 from '../images/nby_LL10651_0000.jpg'
// import nbyLL10834 from '../images/nby_LL10834_0000.jpg'
// import nbyLL10839 from '../images/nby_LL10839_0000.jpg'
// import nbyLL11503 from '../images/nby_LL11503_0000.jpg'
// import nbyLL12011 from '../images/nby_LL12011_0000.jpg'
// import nbyLL13424 from '../images/nby_LL13424_0000.jpg'
// import nbyLL9161 from '../images/nby_LL9161_0000.jpg'
// import nbyVO1422 from '../images/nby_VO1422_0000.jpg'
// import nbyVO184 from '../images/nby_VO184_0001.jpg'


// const bgarray = [
//     [nby0BH40,'nby_0BH40_0000.jpg','Unloading tobacco in a warehouse in North Carolina'],
//     [nby1BH1504,'nby_1BH1504_0001.jpg','The Tribune Tower, Chicago'],
//     [nby1BH1507,'nby_1BH1507_0001.jpg','Skyline of Chicago from Grant Park'],
//     [nby1BH1574,'nby_1BH1574_0000.jpg','Billy\'s'],
//     [nby1BH2115,'nby_1BH2115_0001.jpg','Congress Hotel, Chicago'],
//     [nby1BH2128,'nby_1BH2128_0001.jpg','Train platform, Chicago\'s initial subways'],
//     [nby1BH2450,'nby_1BH2450_0001.jpg','200 Alexander McKinlock Memorial Campus, Northwestern University, Chicago'],
//     [nby1BH2469,'nby_1BH2469_0000.jpg','There\'s nothing like it in all the world'],
//     [nby2B268,'nby_2B268_0000.jpg','Color Guard in garrison review, Camp Crowder, Missouri'],
//     [nby2BH695,'nby_2BH695_0001.jpg','The Berkshire Hotel'],
//     [nby3B344,'nby_3B344_0000.jpg','Philipps Swimming Pool -- Dayton, Ohio'],
//     [nby3BH803,'nby_3BH803_0001.jpg','Really Tailored Clothes'],
//     [nby4BH27,'nby_4BH27_0000.jpg','Louis Brooks all around champion for 1943'],
//     [nby4BH454,'nby_4BH454_0001.jpg','Corner of coffee shop, Harriet Hammond McCormick Memorial, a Y.W.C.A. residence'],
//     [nby4BH789,'nby_4BH789_0000.jpg','Cutting a giant fir in the northwest'],
//     [nbyBB28,'nby_BB28_0000.jpg','Cake-walk'],
//     [nbyLL10651,'nby_LL10651_0000.jpg','The cut finger'],
//     [nbyLL10834,'nby_LL10834_0000.jpg','Off for the day, rural family'],
//     [nbyLL10839,'nby_LL10839_0000.jpg','The harvest field'],
//     [nbyLL11503,'nby_LL11503_0000.jpg','True love never did run smooth'],
//     [nbyLL12011,'nby_LL12011_0000.jpg','Red, white & blue'],
//     [nbyLL13424,'nby_LL13424_0000.jpg','American humor from Puck: and rarely a prizewinner'],
//     [nbyLL9161,'nby_LL9161_0000.jpg','Happy Christmas to you'],
//     [nbyVO1422,'nby_VO1422_0000.jpg','Fisher Building, Chicago, Ill. '],
//     [nbyVO184,'nby_VO184_0001.jpg','Graham Burnham and Co., architects']
// ]
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
const Bodycss = styled.div`
    z-index: -9990;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(${props => props.bg});
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
    .bglink {
        z-index: 999;
    }

`
function getWindowSize() {
    const isBrowser = typeof window === "object"
    //halving window width because we dont really need it to be that big
    const returnValue = isBrowser ?Math.ceil(window.innerWidth * 0.5, window.innerHeight * 0.5 ): undefined
    return  returnValue
}
const Background = props => {
    const firstLoad = useRef(true);
    const [bgLink, setBgLink] = useState('')
    const rando = [Math.round(Math.random() * (bgarray.length - 1)), getWindowSize()]
    const bodybg = bgarray[rando[0]]
    const bgId = bodybg[0] + '$' + bodybg[1]
    if (firstLoad.current){
        firstLoad.current = false
        setBgLink(`//iiif.archivelab.org/iiif/` + bgId + `/full/${rando[1]}/0/default.jpg`)
        props.setBgId(bodybg[0])
        props.setBgNo(bodybg[1])
    }
    return (
        <Bodycss bg={bgLink} />
    )
}
export default Background

