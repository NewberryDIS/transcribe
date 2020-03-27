import React from "react"
import PropTypes from "prop-types"
import withLocation from "./withLocation"

const CustomQueryStringComponent = ({ search }) => {
  const { id } = search
  return <p>Custom Value: {id}</p>
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)