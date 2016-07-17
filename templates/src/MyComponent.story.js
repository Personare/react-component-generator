import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MyComponent from './MyComponent';

storiesOf('MyComponent', module)

.add('Without properties', () => (
    <MyComponent>
    </MyComponent>
))

.add('With name property', () => (
    <MyComponent name="Cauê Alves">
    </MyComponent>
));

