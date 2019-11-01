import React from 'react'
import styled from '@emotion/styled'


import a from '../images/1.jpg'
import b from '../images/2.jpg'
import c from '../images/3.jpg'
import d from '../images/4.jpg'
import e from '../images/5.jpg'
import f from '../images/6.jpg'
import g from '../images/7.jpg'
import h from '../images/8.jpg'
import i from '../images/9.jpg'
import j from '../images/10.jpg'
import k from '../images/11.jpg'
import l from '../images/12.jpg'
import m from '../images/13.jpg'
import n from '../images/14.jpg'
import o from '../images/15.jpg'
import p from '../images/16.jpg'
import q from '../images/17.jpg'
import r from '../images/18.jpg'

const Cardwrapper = styled.div`
    display: flex; 
    flex-wrap: wrap;
    // flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    &.card {
        flex: auto;
        padding: 0;
        margin: 10px;
        max-width: 300px;
        background-color: white;
        // height: 450px;
    }
    .cardText {
        margin: 10px;
        padding: 10px;
    }
    .cardImage {
        height: 300px;
        padding: 0;
    }
`

const images = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r]

const Card = props => {
    const img = images[(Math.floor((Math.random() * 17) + 1))]
    return (
        <Cardwrapper className="card">
            <div className="cardImage">

                <img src={img} alt="sample from collection"/>
            </div>
            <div className="cardText">
                <h3>
                    {props.title}
                </h3>
                <p>
                    {props.desc}
                </p>
                <p>
                    {Math.round(props.prog,0)}%
                </p>
            </div>
        </Cardwrapper>
    )
}


const Cardsection = props => {
    const cards = props.items.slice(0,20).map((i) => <Card key={i.id} image={i.image} title={i.name} desc={i.desc} prog={i.calc_complete} />)
    return (
        <Cardwrapper>
            {cards}
        </Cardwrapper>
    )
}
export default Cardsection