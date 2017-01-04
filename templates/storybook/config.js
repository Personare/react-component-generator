import { configure, setAddon, addDecorator } from '@kadira/storybook'
import GithubCorner from '@personare/react-storybook-decorator-github-corner'
import AddonInfo from '@kadira/react-storybook-addon-info'

addDecorator(GithubCorner)
setAddon(AddonInfo)

function loadStories () {
  require('../src/<%= camelName %>.story')
}

configure(loadStories, module)
