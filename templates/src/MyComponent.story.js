import React from 'react'
import { storiesOf } from '@kadira/storybook'

import <%= camelName %> from './index'

const stories = storiesOf('<%= camelName %>', module)

stories.addWithInfo('Without properties', () => (
  <<%= camelName %> />
), { propTables: [<%= camelName %>], inline: true, header: false })
