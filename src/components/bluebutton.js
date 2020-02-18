import styled from '@emotion/styled'
import { fonts, colors } from './styles'

const Bluebutton = styled.div`
        width: 100%;
        text-align: center;
        .button {
            font-family: ${fonts.sans};
            margin: 10px auto;
            display: inline-block;
            width: initial;
            padding: 12px 15px ;
            border: 1px solid black;
            // border-radius: 8px;
            cursor: pointer;
            box-shadow: inset 0 0 10px rgba(0,42,85,1);
            background: rgba(125,159,193,1);
            color: rgba(${colors.fg},0.8);
            transition: background 0.5s, color 0.1s;
            &:hover {
                color: rgba(${colors.fg},1);
                background: rgba(143,169,195,1);
            }
            &.inactive {
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