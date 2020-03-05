import React from "react"
import { graphql } from "gatsby"

export default ( props ) => {
    console.log(props.pageContext)
    const item = props.pageContext
    // console.log(item)
    return (
        <div>
            <pre>{item.title}</pre>
        </div>
    )
}
// export const query = graphql`
//   {
//     sitePage {
//       context {
//         id
//         title
//         transcount
//       }
//     }
//   }
// `
