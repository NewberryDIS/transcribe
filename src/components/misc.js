import styled from '@emotion/styled'

export const colors = {
    fg: '#000',
    bg: 'rgba(255,255,255,0.85)'
    // fg: '#F8F8F2',
    // bg: '#282A36'
    // fg: '#ABB2BF',
    // bg: '#1E2127'
}
export const FontSizes = {
    xs: 'calc(9px + 0.5vw)',
    sm: 'calc(10px + 0.5vw)',
    md: 'calc(10px + 1vw)',
    lg: 'calc(10px + 1.25vw)',
    xl: 'calc(0.5rem + 3vw)',
    xxl: 'calc(0.5em + 4vw)'
}

export const z = {
    top: '4',
    mid: '2',
    btm: '1',
    bg: '0,'
}

export const Cardwrapper = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-decoration: none;

    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.75);
    &:hover {
        box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    }
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    position: relative;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
    margin: 10px;
    padding: 0;
    background-color: ${colors.bg};
    max-width: 300px;
    flex-basis: 350px;
    > * {
        color: black;
    }
    &.card {
        flex: auto;
        text-align: initial;
    }
    .sidebar {
        justify-content: space-around;
        align-content: space-around;
    }
    .cardbg {
        z-index: 0;
        width: calc(100% + 80px);
        background-position: center;
        background-size: cover;
        position: absolute;
        left: -40px;
        right: -40px;
        top: -40px;
        bottom: -40px;
    }
    .cardText {
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        border-top-left-radius:0px;
        border-top-right-radius:0px;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
        flex: 1;
        box-shadow: 
            0px 11px 8px -10px  rgba(0,0,0,0.4),
            0px -11px 8px -10px rgba(0,0,0,0.4); 
        height: calc(100% - 250px);
        padding: 20px;
        backdrop-filter: blur(4px);
        background-color: rgba(255, 255, 255, 0.5); 
    }
    .cardcap {
        flex: 1;
        img {
            height: 250px;
        }
    }
    .cardtitle, .carddesc {
        margin-bottom: 10px;
        flex: 1;
    }
    .cardprogress {
        font-size: 1rem;
        line-height: 15px;
        height: 1rem;
        width: 100%;
        margin: auto;
        padding: 5px;
        border: 1px solid black;
        text-align: center;
        flex-basis: 25px;
    }
`