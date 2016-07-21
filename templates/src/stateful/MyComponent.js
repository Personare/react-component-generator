import React, { Component } from 'react';

import './<%= camelName %>.css';

class <%= camelName %> extends Component {
    constructor() {
        super();

        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.addTimeToCounter(this.state.count);
        }, 1000);
    }

    addTimeToCounter(time) {
        this.setState({
            count: (time + 1)
        });
    }

    render() {
        return (
          <div>
            Hello, you are here there: <span>{this.state.count}</span> seconds
          </div>
        );
    }
}

export default <%= camelName %>;
