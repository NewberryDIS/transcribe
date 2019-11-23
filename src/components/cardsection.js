import React from 'react'
import styled from '@emotion/styled'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

// import a from '../images/1.jpg'
// import b from '../images/2.jpg'
// import c from '../images/3.jpg'
// import d from '../images/4.jpg'
// import e from '../images/5.jpg'
// import f from '../images/6.jpg'
// import g from '../images/7.jpg'
// import h from '../images/8.jpg'
// import i from '../images/9.jpg'
// import j from '../images/10.jpg'
// import k from '../images/11.jpg'
// import l from '../images/12.jpg'
// import m from '../images/13.jpg'
// import n from '../images/14.jpg'
// import o from '../images/15.jpg'
// import p from '../images/16.jpg'
// import q from '../images/17.jpg'
// import r from '../images/18.jpg'

const Cardwrapper = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-evenly;
    &.card {
        flex-direction: column;
        position: relative;
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 3px;
        flex: auto;
        padding: 0;
        margin: 10px;
        max-width: 300px;
        background-color: white;
        height: 450px;
        overflow: hidden;
    }
    .cardbg {
        z-index: 0;
        width: calc(100% + 80px);
        background-position: center;
        background-size: cover;
        position: absolute;
        left: -40px;
        right: -40px;
        top: -40px;
        bottom: -40px;
    }
    .cardText {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
        flex: 1;
        // overflow: auto;
        box-shadow: 
            0px 11px 8px -10px  rgba(0,0,0,0.4),
            0px -11px 8px -10px rgba(0,0,0,0.4); 
        height: calc(100% - 250px);
        padding: 20px;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.5); 
    }
    .cardcap {
        flex: 1;
        content: "";
    }
    .cardtitle, .carddesc {
        flex: 1;
    }
    .cardprogress {
        width: 100%;
        margin: auto;
        padding: 5px;
        border: 1px solid black;
        text-align: center;
        flex-basis: 40px;
    }
`

// const images = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r]

const Card = props => {
    return (
        <Cardwrapper className="card" >
            <div className="cardbg" css={css`background-image: url('${props.image}');`} />
            <div className="cardcap" />
            <div className="cardText">
                <h3 className="cardtitle">
                    {props.title}
                </h3>
                <p className="carddesc">
                    {props.desc}
                </p>
                <div className="cardprogress" css={css`
                    background-image:
                        linear-gradient(
                            to right,
                            rgba(140, 181, 129,0.5),
                            rgba(140, 181, 129,0.5) ${Math.round(props.prog,0)}%,
                            rgba(255,255,255,0.25) ${Math.round(props.prog,0)}%,
                            rgba(255,255,255,0.25)
                        );`}>{Math.round(props.prog,0)}%</div>
            </div>
        </Cardwrapper>
    )
}

const Cardmaker = props => {
    props.items.slice
}

const Cardsection = props => {
    const cards = props.items.slice(20,20).map((i) => {
        // let desc = i.desc.substring(0,50)
        let imagePath = i.image.lastIndexOf('/') > -1 ? i.image.substring(i.image.lastIndexOf('/')) : false
        let image = !imagePath ?'No Image Found.' : require('../images/thumbs' + imagePath)
        return (
        <Card key={i.id} image={image} title={i.name} desc={i.desc} prog={i.calc_complete} />
    )
    })
    return (
        <Cardwrapper>
            {cards}
        </Cardwrapper>
    )
}
export default Cardsection