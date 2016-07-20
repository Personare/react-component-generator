import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';

import <%= camelName %> from './../src/<%= camelName %>';

describe('<%= camelName %> with default behavior', function <%= camelName %>Tests() {
    it('should have Hello message', () => {
        const wrapper = shallow(<<%= camelName %> />);
        expect(wrapper.text()).to.be.equal('Hello ');
    });
});
