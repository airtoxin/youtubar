import React from 'react';
import lodash from 'lodash';
import { render } from 'react-dom';
import { root } from 'baobab-react/higher-order';
import App from './views/App';
import tree from './tree';
import * as localStorageService from './services/localstorage';
import middlewares from './middlewares';
import apiClient from './services/api-client';

// set middlewares
const mdls = lodash.reverse(middlewares.slice());
tree.on('update', (updatee) => {
  mdls.reduce(
    (next, middleware) => (tr, updt) => middleware(tr, updt, next),
    () => {},
  )(tree, updatee);
});

// restore values from local storage
Object.entries(localStorageService.getAll()).forEach(([key, value]) => {
  tree.set(key.split('/'), value);
});
tree.commit();

// set token refresher
const refreshToken = () => apiClient.refreshToken().then(newToken => tree.set(['auth', 'token'], newToken));
setInterval(refreshToken, 1000 * 60);
refreshToken();

const Rooted = root(tree, App);

render(<Rooted />, global.window.document.getElementById('app'));
