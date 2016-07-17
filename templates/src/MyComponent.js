import React from 'react';

const MyComponent = React.createClass({
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        )
    }
})

export default MyComponent;