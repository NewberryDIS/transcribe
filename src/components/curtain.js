import React, { useEffect } from 'react'
import styled  from '@emotion/styled'
import * as basicScroll from 'basicscroll'
import bg from '../images/nbbg.jpg'

const Curtaincss = styled.div`
    z-index: 10;
    width: 100%;
    height: 80vh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    background: url(${bg});
    background-size: cover;
    background-position: center;
    // background-attachment: fixed;
    .textArea {
        flex: 1;
    }
    .anchorone, .anchortwo {
        position: absolute;
        height: 4px;
        background: rgba(101,101,3,1);
    }
    .anchorone {
        top: 40vh;
        width: 20px;
    }
    .anchortwo {
        top: 80vh;
        width: 20px;
    }
    .anagramcontainer {
        margin: auto;
        text-align: center;
    }
    .textbox {
        position: fixed;
        top: var(--top);
        left: var(--left);
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
    // const textarray = jumbler(text, 36.125 )
    // console.log(textarray)
    const letters = text.split('').map((i, index) => {
        const tx = Math.round((Math.random() * 100),0)
        const ty = Math.round((Math.random() * 200),0)
        const r =  Math.round((Math.random() * 100),0)
        const posneg = Math.round(Math.random()) === 1 ? '' : '-'
        i = i === ' ' ? '\u00A0' : i
        return (
                <span key={index} className="letter" data-tx={posneg + tx} data-ty={posneg + ty}  data-r={posneg + r}>{i}</span>
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

function bscreator(instances, letters, textbox, anchor){
    var jSLintSucks = letters !== null ? letters.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') + 'px'
        const ty = elem.getAttribute('data-ty') + 'px'
        const r  = elem.getAttribute('data-r')  + 'deg'
        instances.push(basicScroll.create({
            elem: anchor[0],
            from: 0,
            to: '40vh',
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
    jSLintSucks = letters !== null ? letters.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') + 'px'
        const ty = elem.getAttribute('data-ty') + 'px'
        const r  = elem.getAttribute('data-r')  + 'deg'
        instances.push(basicScroll.create({
            elem: anchor[1],
            from: '40vh',
            to: '80vh',
            direct: elem,
            props: {
                '--tx': {
                    from: tx,
                    to: 0,
                },
                '--ty': {
                    from: ty,
                    to: 0,
                },
                '--r': {
                    from: r,
                    to: 0,
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
                },
                '--left': {
                    from: '35vw',
                    to: 0,
                },
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
    const title = 'Newberry Transcribe'
    const instances = []
    const anchor = []
    anchor.push(typeof document !== `undefined` ? document.querySelector('.anchorone') : null)
    anchor.push(typeof document !== `undefined` ? document.querySelector('.anchortwo') : null)
    // const anchor = typeof document !== `undefined` ? document.querySelector('.anchor') : null
    const letters = typeof document !== 'undefined' ? document.querySelectorAll('.letter') : null
    const textbox = typeof document !== 'undefined' ? document.querySelectorAll('.textbox') : null
    useEffect(() => {
        bscreator(instances, letters, textbox, anchor)
    })
    return (
        <Curtaincss>
            <div className="textArea" >
                <div className="anchorone"></div>
                <div className="anchortwo"></div>
                <div className="anagramcontainer">
                    <Jumbletext text={title} />
                </div>
            </div>
        </Curtaincss>
    )
}

export default Curtain