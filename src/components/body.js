import { useState }  from "react"
import Sidebar from '../components/sidebar'
import Masonry from '../components/masonry'
import {Container} from './pieces'
/** @jsx jsx */ 
import { jsx, css } from '@emotion/core'

const Features = () => {
    const [show, setShow] = useState(true);
    return (
    <section>
        
        <Container wrap={'nowrap'} css={css`
            justify-content: stretch;
        `}>
            <Sidebar show={show} setShow={setShow} />
            <Masonry />
        </Container>
    </section>
    )
}
export default Features