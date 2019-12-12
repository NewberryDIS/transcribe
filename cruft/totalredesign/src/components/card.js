import React from 'react'
import {Cardwrapper} from './misc'
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Card = props => {
    const prog = !props.prog ? 0 : Math.round(props.prog,0)
    return (
        <Cardwrapper href={'http://google.com/' + props.id} className="card" >
            <div className="cardbg" css={css`background-image: url('${props.image}');`} />
            <div className="cardcap">
                <img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            </div>
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
                            rgba(140, 181, 129,0.5) ${prog}%,
                            rgba(255,255,255,0.25) ${prog}%,
                            rgba(255,255,255,0.25)
                        );`}>{prog}%</div>
                <div className="" href={props.id} css={css`
                    font-family: 'Lato', sans-serif;
                    color: black;
                    text-decoration: none;
                    margin-top: 10px;
                    padding: 15px 30px;
                    border: 1px solid rgba(0,0,0, 0.5);
                    text-align: center;
                    text-transform: uppercase;
                    transition: all .15s ease-in-out;
                    &:hover {
                        border: 1px solid #000;
                        background-color: #fff;
                        -webkit-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                        -moz-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                        box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
                    }
                    background: rgba(255,255,255,0.8);
                    border-radius: 6px; 
                }
                `}>
                    Transcribe Now
                </div>
            </div>
        </Cardwrapper>
    )
}
export default Card