import React from 'react'
import { storiesOf } from '@kadira/storybook'

import <%= camelName %> from './<%= camelName %>'

const stories = storiesOf('<%= camelName %>', module)

stories.addWithInfo('Without properties', () => (
  <<%= camelName %> />
), { propTables: false, inline: true, header: false })
