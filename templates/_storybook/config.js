import { configure } from '@kadira/storybook';

import '../src/<%= camelName %>.css';

function loadStories() {
  require('../src/<%= camelName %>.story');
}

configure(loadStories, module);
