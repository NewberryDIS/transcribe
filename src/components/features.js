/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { Container, Colors } from './pieces'
import bg from '../images/feature.jpg'

const Featurebox = styled.div`
    background: ${Colors.bgcolor};
    border-radius: 2px;
    // box-shadow: 0 10px 10px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    box-shadow: 2px 4px 10px rgba(0,0,0,.6);
    position: relative;
    padding: 20px;
    margin: 15px 15% auto auto;
    color: ${Colors.fgcolor};
    @media (max-width: 700px) {
        margin: 15px auto 0 auto;
    }
    & h2 {
        font-style: italic;
    }
`

const Features = () => (
    <section css={css`
        position: relative;
        background-image: url(${bg});
        background-position: 25% 25%;
        {/* background-size: cover; */}
`}>
        <Container >
                    <Featurebox>
                        <h2>this would be a featured item</h2>
                        <p>a lil text might go here</p>
                    </Featurebox>
        </Container>
    </section>
)

export default Features