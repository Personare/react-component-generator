import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import <%= camelName %> from './<%= camelName %>';

storiesOf('<%= camelName %>', module)

.add('Without properties', () => (
    <<%= camelName %>>
    </<%= camelName %>>
))

.add('With name property', () => (
    <<%= camelName %> name="Cauê Alves">
    </<%= camelName %>>
));

