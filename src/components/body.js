import { useState }  from "react"
import Sidebar from '../components/sidebar'
// import Masonry from '../components/masonry'
import {Container} from './pieces'
import ClientFetchingExample from './clientdata'
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
        <ClientFetchingExample />
        </Container>
    </section>
    )
}
export default Features