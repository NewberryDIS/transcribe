import styled from '@emotion/styled'

export const colors = {
    fg: '37,37,37',
    bg: '208,208,208',
    hl: '15,76,129',
    hll: '144,165,182',
    hld: '121,139,153',
}
export const fonts = {
    sans: "'Basic Commercial W01', Helvetica, sans-serif",
    serif: "'Bembo W01', Cardo, serif", 
}
export const CoreBox = styled.div`
    background: rgba(${colors.bg}, 1);
    border: 2px solid rgba(${colors.hl}, 1);
    box-shadow: inset 0 0 10px rgba(${colors.fg},0.5);
`
export const Bluebutton = styled.div`
        width: 100%;
        text-align: center;
        position: relative;
        .wrapper {
            background: rgba(${colors.bg},1);
            display: inline-block;
            border: 1px solid  rgba(${colors.fg}, 1);
            box-shadow: inset 0 0 10px rgba(${colors.hl},1);
            padding: 0;
            margin: 6px auto;
        }
        .button {
            text-decoration: none;
            font-family: ${fonts.sans};
            display: inline-block;
            width: initial;
            padding: 10px 12px;
            font-size: 14px;
            cursor: pointer;
            text-transform: uppercase;
            // background: rgba(${colors.hll},1);
            background: rgba(${colors.hl},0.4);
            color: rgba(${colors.fg},0.8);
            transition: background 0.1s, color 0.1s;
            font-weight: 900;
            &:hover {
                color: rgba(${colors.fg},1);
                background: rgba(${colors.hl},0.33);
            }
            &.inactive {
                display: none;
                cursor: not-allowed;
                box-shadow: inset 0 0 10px rgba(${colors.fg},1);
                background: rgba(${colors.bg},1);
                color: rgba(${colors.fg},0.8);
                transition: background 0.5s, color 0.1s;
                &:hover {
                    color: rgba(${colors.fg},0.4);
                    background: rgba(${colors.bg},1);
                }
            }
        }
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
export const Modal = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(${colors.fg},0.33);
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
export const Selectcss = styled.select`
    font-family: ${fonts.sans};
    box-shadow: inset 0 0 10px rgba(${colors.hl},0.5);
    border: 2px solid rgba(${colors.fg},0.7);
    background: rgba(${colors.bg},0.7);
    margin: 4px 0;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-left: 5px;
    text-transform: uppercase;
    width: 100%;
`
export const Gardacss = styled.footer`
    padding: 15px;
    width: 90%;
    margin: auto;
    color: rgba(${colors.fg},1);
    display: flex;
    flex-wrap: wrap;
    .footercontent {
        padding: 25px;
        &.tweets{
            overflow: auto;
            max-height: 500px;
            iframe {
                border-radius: 5px;
                box-shadow:  0 0 8px rgba(${colors.fg},1);
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
        h3 {
            // display: inline;
        }
    }
    .imagelink {

            background: none;
            display: block;
            margin: auto;
            width: 100%;
        img {
            display: block;
            max-width: 85%;
            border-radius: 5px;
            margin: auto;
            // margin:  0 auto 20px auto;
            box-shadow:  0 0 8px rgba(${colors.fg},1);
        }
    }
    .masonry-grid {
        flex: 1;
        display: flex;
        margin-left: -30px; /* gutter size offset */
        // width: auto;
    }
    .masonry-grid_column {
        padding-left: 30px; /* gutter size */
        background-clip: padding-box;
    }
    .masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
        margin: 0 auto 30px auto;
    }
`
export const Contentcss = styled.div`
    position: relative;
    max-height: 90vh;
    overflow: auto;
    background-color: rgba(${colors.bg},1);
    padding: 5px 25px;
    margin: 10vh auto;
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
