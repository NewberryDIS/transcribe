import styled from '@emotion/styled'

export const FontSizes = {
    xs: 'calc(10px + 0.5vw)',
    sm: 'calc(12px + 0.5vw)',
    md: 'calc(12px + 1vw)',
    lg: 'calc(12px + 1.25vw)',
    xl: 'calc(20px + 1.5vw)'
}
export const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: ${props => props.wrap};
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