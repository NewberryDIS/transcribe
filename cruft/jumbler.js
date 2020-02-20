import React, { useEffect } from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'

const Curtaincss = styled.div`
    z-index: 10;
    width: 100%;
    height: 80vh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    .textArea {
        flex: 1;
    }
    .anchor {
        position: absolute;
        top: 80vh;
        width: 20px;
        height: 4px;
        // flex-basis: 5px;
        background: rgba(101,11,3,1);
        // opacity: 0; // Disable to view the anchor
    }
    .anagramcontainer {
        margin: auto;
        text-align: center;
    }
    .textbox {
        position: fixed;
        top: var(--top);
        // height: 70vh;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .letter {
        font-family: monospace;
        font-size: 60px;
        display: inline-block;
        opacity: var(--opacity);
        transform: translate(var(--tx), var(--ty)) rotate(var(--r));
        will-change: transform, opacity;
    }
`
const Jumbletext = ({ text }) => {
    const textarray = jumbler(text, 36.125 )
    // console.log(textarray)
    const letters = textarray.map((l, i) => {
        // const disappear = l[1] === 'nf' ? ' disappear' : ''
        const tx = l[1] === 'nf' ? 0 : l[1]  * -1
        // console.log(l[0] + ': ' + tx)
        return (
            <span key={i} className="letter" data-tx={tx} data-ty={'1'} data-r={randomRotation()} >{l[0]}</span>
        )
    })
    return (
        <div className="textbox" >
            <div className="texttop">
                {letters}
            </div>
        </div>
    )
}

function bscreator(instances, moveyletters, textbox, anchor){
    var jSLintSucks = moveyletters !== null ? moveyletters.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') + 'px'
        const ty = elem.getAttribute('data-ty') + 'px'
        const r  = elem.getAttribute('data-r')  + 'deg'
        instances.push(basicScroll.create({
            // elem: anchor,
            from: '100vh',
            to: '200vh',
            direct: elem,
            props: {
                '--tx': {
                    from: 0,
                    to: tx,
                },
                '--ty': {
                    from: 0,
                    to: ty,
                },
                '--r': {
                    from: 0,
                    to: r,
                }
            }
        }))
    }) : ''
    jSLintSucks = textbox != null ? textbox.forEach((elem) => {
        instances.push(basicScroll.create({
            elem: anchor,
            from: 0,
            to: '70vh',
            props: {
                '--top': {
                    from: '65vh',
                    to: 0,
                }
            }
        }))
    }) : ''
    instances.forEach((instance) => instance.start())
}

function randomRotation() {
    var on = false, 
        straight = true,
        val = ((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10))) - 360
    if ( on ) {
        if ( straight ) {
            return 360
        } else {
            return val
        } 
    } else {
        return 0
    }
}

function jumbler(text, size){
    let position = []
    const start = text.split('')
    let end = text.split('').sort(() => Math.random() - 0.5)
    start.map((s, i) => {
        s = s === ' ' ? '\u00A0' : s
        let posarray = []
        posarray.push(s)
        let endpos = end.indexOf(s)
        if( endpos > -1 ){
            posarray.push(((i + 1) * size) - ((endpos + 1) * size))
            end[endpos] = '-'
        } else {
            posarray.push('nf')
        }
        position.push(posarray)
    })
    console.log(position)
    return position
}

const Curtain = () => {
    const subTitle = 'Help unlock the past!'
    const title = 'Help unlock the past!'
    const letters = subTitle.split('').sort(() => Math.random() - 0.5).join('')
    const instances = []
    const anchor = typeof document !== `undefined` ? document.querySelector('.scrollanchor') : null    
    const moveyletters = typeof document !== 'undefined' ? document.querySelectorAll('.letter') : null
    // const fadeyletters = typeof document !== 'undefined' ? document.querySelectorAll('.disappear') : null
    const textbox = typeof document !== 'undefined' ? document.querySelectorAll('.textbox') : null
    // useEffect(() => {
    //     bscreator(instances, moveyletters, textbox, anchor)
    // })
    useEffect(() => {
        bscreator(instances, moveyletters, textbox, anchor)
    })
    return (
        <Curtaincss>
            <div className="textArea" >
                <div className="anchor"></div>
                <div className="anagramcontainer">
                    <Jumbletext text={'Help unlock the past!'} />
                    {/* {console.log(letters)} */}
                </div>
            </div>
        </Curtaincss>
    )
}

export default Curtain