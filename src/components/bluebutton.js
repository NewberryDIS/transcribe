import styled from '@emotion/styled'
import { fonts, colors } from './styles'

const Bluebutton = styled.div`
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
export default Bluebutton