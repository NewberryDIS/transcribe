import { useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'


export const bgarray = [
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
    // ['nby_3BH803','1'],
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

const Background = props => {
    let bgLink;
    const [rando, setRando ] = useState(Math.round(Math.random() * (bgarray.length - 1)))
    if (props.image){
        bgLink = props.image
    } else {
        const bodybg = bgarray[rando]
        bgLink = '//iiif.archivelab.org/iiif/' + bodybg[0] + `$` + bodybg[1] + '/full/1000,/0/default.jpg'
    }
    //https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    useEffect(() => {
        const interval = setInterval(() => {
            if(props.image) {setRando(Math.round(Math.random() * (bgarray.length - 1)))}
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    return(
        <div css={css`
        z-index: -9990;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url('${bgLink}');
        background-size: cover;
        background-position: 50% 50%;
        overflow: hidden;
        max-width: 100vw;
        max-height: 100vh;
        transition: all 1s;
        `}/>
    )
}

export default Background