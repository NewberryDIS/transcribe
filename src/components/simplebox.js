import React from 'react'
import styled from '@emotion/styled'
import { fonts, colors } from './styles'
import Progress from './progressbar'

const Boxcss = styled.a`
    --height: 20vw;
    --width: 20vw;
    margin: 10px;
    width: var(--width);
    height: var(--height);
    .boxwrapper {
        position: relative;
        .image {
            position: absolute;
            height: var(--height);
            width: var(--width);
            overflow: hidden;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            transition: top 0.2s;
            background: url(${props => props.img});
        }
        .textwrapper {
            padding-top: calc(var(--height) * 0.25);
            width: var(--width);
            .category {
                font-family: ${fonts.sans};
                font-size: 0.7rem;
                text-transform: uppercase;
                color: rgba(${colors.hl}, 1);
                span {
                    cursor: pointer;
                    margin: 0;
                    padding: 0 5px;
                    border-right: 1px solid rgba(${colors.hl}, 0.8);
                    background-image: linear-gradient(transparent 1px, rgba(${colors.hl}, 0.8) 2px);
                    background-size: 0% 2px;
                    background-position: 0% 105%;
                    background-repeat: no-repeat;
                    transition: background-size 0.2s ease 0s;
                    &:hover {
                        // border-bottom: 1px solid rgba(${colors.hl}, 1);
                        background-size: 100% 3px;
                    }
                    &:first-of-type {
                        padding: 0 5px 0 0;
                    }
                    &:last-of-type {
                        border-right: 0;
                    }
                }
            }
            h3 {
                padding: 0;
                margin: 5px 0;
                font-family: ${fonts.serif};
            }
            .desc {

                font-family: ${fonts.sans};
            }
            .progress {

            }
        }
    }
    &:hover {
        .image {
            top: calc((var(--height) * 0.75) * -1);
        }
    }
`

const Box = props => {
    const cats = props.category.split(';').map((i) => {
        i = i.trim()
        return <span onClick={() => props.setSubjFilter(i)}>{i}</span>
    })
    return (
    <Boxcss className="box" id={props.id} href={props.link} img={props.img}>
        <div className="boxwrapper">
            <div className="image"  > </div>
            {/* <img src={props.img} /> */}
            <div className="textwrapper">
                <p className="category">{cats}</p>
                <h3>{props.title.length > 100 ? props.title.substring(0,100) + '...' : props.title}</h3>
                <p className="desc">{props.text}</p>
                <div className="progress"><Progress progress={props.progress} /></div>
            </div>
        </div>
    </Boxcss>
)}

export default Box