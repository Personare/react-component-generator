import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { describe, it, before } from 'mocha';

import <%= camelName %> from './../src/<%= camelName %>';

describe('<<%= camelName %> />', function <%= camelName %>Tests() {
    this.timeout(5000);

    before(() => {
        const componentDidMount = <%= camelName %>.prototype.componentDidMount;

        return componentDidMount.calledOnce;
    });

    it('the state should be equal three after three seconds', done => {
        const wrapper = mount(<<%= camelName %> />);

        setTimeout(() => {
            expect(wrapper.state('count')).to.be.equal(3);
            done();
        }, 4000);
    });
});
