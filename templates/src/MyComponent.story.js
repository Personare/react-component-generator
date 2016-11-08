import React from 'react'
import { storiesOf } from '@kadira/storybook'

import <%= camelName %> from './<%= camelName %>'

const stories = storiesOf('<%= camelName %>', module)

stories.add('Without properties', () => (
  <<%= camelName %> />
))

stories.addWithInfo('With name property', () => (
  <<%= camelName %> name='Cauê Alves' />
), { propTables: false, inline: true, header: false })
