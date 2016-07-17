import React from 'react';

class <%= camelName %> extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}

export default <%= camelName %>;
