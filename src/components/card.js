import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Cardlayout = styled.div`
    border-radius: 10px;
    padding: 1px;
    margin: 10px;
    font-family: sans-serif;
    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.75);
    overflow: hidden;
    &:hover {
        box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    }
    > * {
        padding: 10px;
    }
    .cardcap, .cardbody {
        flex: 1;
    }
    .cardbody {
        backdrop-filter: blur(8px);
        background-color: rgba(255, 255, 255, 0.5); 
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        border-top-left-radius:0px;
        border-top-right-radius:0px;
    }
`

const ContentCard = props => (
    <Fragment>
        <div className="cardtitle"> {props.title }</div>
        <div className="cardtext">  {props.text  }</div>
        <div className="cardprog">  {props.prog  }</div>
        <div className="cardbutton">{props.link  }</div>
    </Fragment>
) 

const Filters = props => (
    <div className="filters">
        <input />
        
    </div>
)

const Card = props => (
    <Cardlayout>
        <div className="cardcap">
            <h3>{props.captext}</h3>
        </div>
        <div className="cardbody">
            {props.sidebarcard ? 
                <Filters />
            : <ContentCard 
                title={props.title}
                text={props.text}
                prog={props.prog}
                link={props.link}
            />
            }
        </div>
    </Cardlayout>
)

export default Card