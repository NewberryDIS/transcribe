/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import { colors } from '../components/misc'

const Sicon = () => <div className="search-wrapper" css={css`
    flex-basis: 40px;
    padding-bottom: 3px;
    color: ${colors.fg};
    text-align: center;
    padding: 0px 10px 0 0;
    .search-wrapper {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 0 auto;
        background-color: ${colors.fg};
    }
    
    .search {
        position: relative;
        width: 20px;
        margin: 0 auto;
        padding: 8px 0 0 5px;
        text-align: center;
    }
    .search__circle {
        width: 17px;
        height: 17px;
        border: 3px solid ${colors.fg};
        border-radius: 15px;
    }
    .search__rectangle {
        position: absolute;
        right: -6px;
        bottom: -2px;
        width: 10px;
        -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
        border: 2px solid ${colors.fg};
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`}>
  <div className="search">
    <div className="search__circle"></div>
    <div className="search__rectangle"></div>
  </div>
</div>
export default Sicon