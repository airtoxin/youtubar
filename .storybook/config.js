import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
  require('../src/renderer/views/atoms/storybook');
}

configure(loadStories, module);
