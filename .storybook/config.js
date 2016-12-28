import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
  require('../src/renderer/views/atoms/storybook');
  require('../src/renderer/views/molecules/storybook');
  require('../src/renderer/views/organisms/storybook');
}

configure(loadStories, module);
