import React from 'react'
import { Location } from '@reach/router'
import queryString from 'query-string'

export default ( children, location ) => {
    console.log(location.pathname)
    return (
        <div>{location.pathname}</div>
    )

}
