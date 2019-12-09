import styled from '@emotion/styled'

export const FontSizes = {
    xs: 'calc(9px + 0.5vw)',
    sm: 'calc(10px + 0.5vw)',
    md: 'calc(10px + 1vw)',
    lg: 'calc(10px + 1.25vw)',
    xl: 'calc(0.5rem + 3vw)',
    xxl: 'calc(0.5em + 4vw)'
}
export const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: ${props => props.wrap};
    position: relative;
    `

export const Row = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    @media (min-width: 1000px) {
        width: 75%;
    }
    @media (max-width: 900px) {
        flex-direction: column;
        margin: 15px;
        // flex-wrap: wrap;
    }
`
export const Flexbox = styled.div`
    display: flex;
    flex: ${props => props.flex};
    flex-direction: ${props => props.column ? 'column' : 'row'};
    // margin: 15px;
    // overflow: auto;
    // border: 1px solid white;
`
export const colors = {
    fg: '#F8F8F2',
    bg: '#282A36'
    // fg: '#ABB2BF',
    // bg: '#1E2127'
}

export const logo = [
    'Newberry Transcribe',
    'Become a part of history'
]
export const z = {
    top: '4',
    mid: '2',
    btm: '1',
    bg: '0,'
}
// export const Colors = {
//     fgcolor: 'rgba(255,255,255,1)',
//     bgcolor: 'rgba(0,0,0,1)',
//     inversion: '100%'
// }
// export const Colors = {
//     fgcolor: 'rgba(0,0,0,1)',
//     bgcolor: 'rgba(255,255,255,1)',
//     inversion: '0%'
// }