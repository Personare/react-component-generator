import { configure, addDecorator } from '@kadira/storybook'
import GithubCorner from '@personare/react-storybook-decorator-github-corner'

addDecorator(GithubCorner)

function loadStories () {
    require('../src/<%= camelName %>story')
}

configure(loadStories, module)
