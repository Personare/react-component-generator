import React, { PropTypes } from 'react';

function <%= camelName %>(props) {
    return <div>Hello {props.name}</div>;
}

<%= camelName %>.propTypes = {
    name: PropTypes.string
};

export default <%= camelName %>;
