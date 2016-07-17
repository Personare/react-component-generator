import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/MyComponent.story');
}

configure(loadStories, module);
