import React from 'react'
import styled from '@emotion/styled'
import {colors, fonts } from './styles'


export const Gardacss = styled.footer`
    width: 90%;
    margin: auto;
    padding: 15px;
    .footerwrapper {
        position: relative;
        width: 80%;
        margin: auto;
        z-index: 0;
        color: rgba(${colors.fg},1);
     
        .textycontent {
            display: flex;
            flex-wrap: wrap;
            padding: 0 15px;
            justify-content: space-between;
            .contact, .license {
                background-color: rgba(${colors.bg},1);
                padding: 25px;
                margin: 15px;
                flex: 1;
                min-width: 300px;
                box-shadow: inset 0 0 8px rgba(${colors.fg},1);
                border: 2px solid rgba(${colors.fg},0.7);
                shadow: 10px 10px 60px rgba(${colors.fg},0.5);
            }
            
            }
        } 
    }
    h3 {
        font-family: ${fonts.serif};
    }
    p {
        font-family: ${fonts.sans};
    }
    a, .notlink {
        font-weight: 900;
        transition: color 0.2s;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
        background-size: 0% 2px;
        background-position: 0% 105%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s, color 0.2s;
        &:hover {
            color: rgba(${colors.fg}, 0.8);
            background-size: 100% 3px;
        }
        cursor: pointer;
    }
`
export const Contentcss = styled.div`
    position: relative;
    // top: 10vmin;
    // left: 25vmin;
    // width: 50vmin;
    background-color: rgba(${colors.bg},1);
    padding: 5px 25px;
    margin: 0 auto 15px auto;
    box-shadow: inset 0 0 8px rgba(${colors.fg},1);
    border: 2px solid rgba(${colors.fg},0.7);
    shadow: 10px 10px 60px rgba(${colors.fg},0.5);
    a, .notlink {
        font-weight: 900;
        transition: color 0.2s;
        text-decoration: none;
        color: rgba(${colors.fg}, 1);
        background-image: linear-gradient(transparent 1px, rgba(${colors.fg}, 1) 2px);
        background-size: 0% 2px;
        background-position: 0% 105%;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease 0s, color 0.2s;
        &:hover {
            color: rgba(${colors.fg}, 0.8);
            background-size: 100% 3px;
        }
        cursor: pointer;
    }
    dt {
        font-family: ${fonts.serif};
        font-weight: 900;
        font-size: 1rem;
    } 
    dd {
        font-family: ${fonts.sans};
        margin: 0 0 10px 0;
        font-size: 0.9rem;
    }
`

export const Closebutton = styled.div`
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    cursor: pointer;
    transition: opacity 0.1s ease;
    &:hover {
        opacity: 1;
    }
    &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }

`