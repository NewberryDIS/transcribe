/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import { colors, logo, z } from '../components/pieces'
import n from '../images/Newberry_N.svg'
import Sicon from './sicon'

const Header = () => {
    return (
        <header css={css`
            width: 80%;
            margin: auto;
            position: sticky;
            top: 0px;
            display: flex;
            
            z-index: ${z.top};
            .logo, .filsea {

                font-weight: bold;
                flex: 1;
                display: flex;
                @media only screen and (max-width: 800px) {
                    flex-direction: column;
                }
                // padding: 5px;
                margin: 5px;
                border: 5px solid ${colors.fg};
                background-color: ${colors.bg};
                color: ${colors.fg};
                display: flex;
                justify-content: space-between;                
                text-transform: uppercase;
                line-height: 40px;
                // text-align: center;
            }
            .logoleft, .logoright, .filters {
                margin: 5px;
                flex: 1;
                font-weight: bold;
            }
            .logoleft {
                font-size: 24px
            }
            .logoright {
                text-align: right;
                font-size: 18px;
            }
            .filterButton, .searchInput, .searchSelect, .searchButton {
                margin: 5px;
                height: 38px;
                background-color: ${colors.bg};
                color: ${colors.fg};
                border: 1px solid white;
            }
            .searchSelect {
                padding: 0 0 0 7px;
            }
            .searchInput {
                flex: 3;
                padding: 4px 0 0 7px;
            }
            .searchButton {
                width: 35px;
                text-align: center;
            } 
            .filterButton {
                line-height: 38px;
            }
            
            `}>
                <div className="logo">
                    <div className="logoleft">{logo[0]}</div>
                    <div className="logoright">{logo[1]}</div>
                </div>
                <div className="filsea">
                        <button className="filterButton">Filter</button>
                        <input className="searchInput" type="text" placeholder="Search..."/>
                        <select className="searchSelect" onChange={(e) => this.handleSelect(e)}>
                            <option defaultValue value="titleFilter">Title</option>
                            <option value="textFilter">Transcription Keywords</option>
                            <option value="subjectFilter">Subjects</option>
                        </select>
                        <div className="searchButton"><Sicon /></div>
                </div>
        </header>
    )
}
export default Header