import React, { PropTypes } from 'react'

import './<%= camelName %>.css'

const <%= camelName %> = (props) => (
  <div>Hello {props.name}</div>
)

<%= camelName %>.propTypes = {
  name: PropTypes.string
}

export default <%= camelName %>
