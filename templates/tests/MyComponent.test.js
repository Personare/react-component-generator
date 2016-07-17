import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MyComponent from './../src/MyComponent';

describe('Component MyComponent', () => {
    it('should have Hello message', () => {
        const wrapper = shallow(<MyComponent />);
        expect(wrapper.text()).to.be.equal('Hello ');
    });
})