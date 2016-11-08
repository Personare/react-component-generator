import { configure, setAddon, addDecorator } from '@kadira/storybook'
import GithubCorner from '@personare/react-storybook-decorator-github-corner'
import InfoAddon from '@kadira/react-storybook-addon-info'

addDecorator(GithubCorner)

setAddon(InfoAddon)

function loadStories () {
  require('../src/<%= camelName %>.story')
}

configure(loadStories, module)
