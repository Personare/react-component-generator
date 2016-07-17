import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/<%= camelName %>.story');
}

configure(loadStories, module);