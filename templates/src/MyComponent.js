import React, { PropTypes } from 'react'

import './<%= camelName %>.css'

function <%= camelName %>(props) {
  return <div>Hello {props.name}</div>
}

<%= camelName %>.propTypes = {
  name: PropTypes.string
}

export default <%= camelName %>
