/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import { Colors } from '../components/pieces'

const standardcss = css`
    position: relative;
    display: block;
    flex-basis: 225px;
    width: 225px;
    .stickycontainer {
        top: 60px;
        position: sticky;
        background: ${Colors.bgcolor};
        border: 1px solid transparent;
        // box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        // border-radius: 2px;
    
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 3px;
        &:hover {
          box-shadow: 2px 4px 10px rgba(0,0,0,0.6);
          // box-shadow: 0 0 0 1px rgba(0,0,0,.16);
        }
    }
    .button {
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    ul {
        list-style-type: none;
        padding: 5px;
        margin: 0;
        li {
            color: ${Colors.fgcolor};
            padding: 5px 5px 5px 10px;
            margin: 5px;
            border-left: 1px solid ${Colors.fgcolor};
            border-bottom: 1px solid transparent;
            text-decoration: none;
            background-image: linear-gradient(${Colors.fgcolor}, ${Colors.fgcolor});
            background-position: 0% 105%;
            background-repeat: no-repeat;
            background-size: 0% 2px;
            transition: background-size .2s;
            &:hover {
                background-size: 100% 2px;
            }
        }
    }

    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: ${Colors.fgcolor};
        margin: 6px 0;
        transition: 0.4s;
    }
      
    .bar1 {
      -webkit-transform: rotate(-45deg) translate(-9px, 6px);
      transform: rotate(-45deg) translate(-9px, 6px);
    }
    
    .bar2 {opacity: 0;}
    
    .bar3 {
      -webkit-transform: rotate(45deg) translate(-8px, -8px);
      transform: rotate(45deg) translate(-8px, -8px);
    }
    .listContainer {
        flex-basis: 250px;
        padding: 15px;
        width: 225px;
    }
`
const hiddencss = css`
    position: relative;
    flex-basis: 1px;
    width: 10px;


    .stickycontainer {
        top: 60px;
        position: sticky;
        border: 1px solid transparent;
        // box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        // border-radius: 2px;
    
        box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
        border-radius: 3px;
        &:hover {
          box-shadow: 2px 4px 10px rgba(0,0,0,0.6);
          // box-shadow: 0 0 0 1px rgba(0,0,0,.16);
        }
    }
    ul {
        display: none;
    }
    .button {
        padding: 2px 7px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        border-radius: 2px;
        background: ${Colors.bgcolor};
        border: 1px solid ${Colors.fgcolor};
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: ${Colors.fgcolor};
        margin: 6px 0;
        transition: 0.4s;
    }
    .listContainer {
        flex-basis: 1px;
        padding: 0;
        width: 1px;
    }
`
const Progress = props => <div css={css`
    width: 100%;
    border: 1px solid black;
    margin: 30px 0;
    background-image:
        linear-gradient(
            to right, 
            rgba(255,0,0,0.25),
            rgba(255,0,0,0.25) ${Math.round(props.percent)}%,
            #fff ${Math.round(props.percent)}%,
            #fff
        );
    padding: 5px;
    p {
        margin-bottom: 3px;
    }
`}>
    <p>
        {numberWithCommas(props.compl)} out of {numberWithCommas(props.total)} pages completed!
    </p>
</div>
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Sidebar = props => {

    console.log(props)
    return (
        <div css={props.show ? standardcss : hiddencss}>
            <div className="stickycontainer">
                <div className="listContainer">
                    {console.log(props.dataContent[0])}
                    <Progress percent={props.dataContent[0].percentComplete} compl={props.dataContent[0].totalcomplete} total={props.dataContent[0].total} />
                </div>
                <div className="button container" onClick={() => props.setShow(!props.show)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
        </div>
    )
}


export default Sidebar