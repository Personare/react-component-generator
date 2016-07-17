import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import <%= camelName %> from './../src/<%= camelName %>';

describe('Component <%= camelName %>', () => {
    it('should have Hello message', () => {
        const wrapper = shallow(<<%= camelName %> />);
        expect(wrapper.text()).to.be.equal('Hello ');
    });
})