import styled from '@emotion/styled'
import {colors, fonts } from './styles'

export const Bluebutton = styled.div`
        width: 100%;
        text-align: center;
        position: relative;
        .button {
            font-family: ${fonts.sans};
            margin: 6px auto;
            display: inline-block;
            width: initial;
            padding: 10px 12px ;
            border: 1px solid black;
            font-size: 14px;
            // border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: inset 0 0 10px rgba(0,42,85,1);
            background: rgba(125,159,193,1);
            color: rgba(${colors.fg},0.8);
            transition: background 0.5s, color 0.1s;
            &:hover {
                color: rgba(${colors.fg},1);
                background: rgba(143,169,195,1);
            }
            &.inactive {
                display: none;
                cursor: not-allowed;
                box-shadow: inset 0 0 10px rgba(${colors.fg},1);
                background: rgba(125,125,125,1);
                color: rgba(${colors.fg},0.8);
                transition: background 0.5s, color 0.1s;
                &:hover {
                    color: rgba(${colors.fg},0.4);
                    background: rgba(125,125,125,1);
                }
            }
        }
    }
`

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

export const ClickExpander = styled.div`
    position: relative;
    .toggle-height-hide {
        overflow: hidden;
        transition: max-height .6s ease;
        max-height: 1px;
    }
    .toggle-height-show {
        overflow: hidden;
        transition: max-height .6s ease;
        max-height: 1000px;
    }
    .toggle-transform-hide {
        overflow: hidden;
        transition: transform .4s ease;
        transform: translateY(-100%);
    }
    .toggle-transform-show {
        overflow: hidden;
        transition: transform .4s ease;
        transform: translateY(0);
    }
`
export const Modal = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(37,37,37,0.33);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    > div {
        padding: 40px;
        margin: auto;
        width: 65%;
        @media (min-width: 979px;) { width: 75%; }
        @media (min-width: 768px;) and (max-width: 978px;) { width: 85%; }
        @media (max-width: 768px;) { width: 95%; }
    }
`