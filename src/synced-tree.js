import Baobab from 'baobab';
import { ipcMain, ipcRenderer } from 'electron';
import { isEqual } from 'lodash';

export function browserTree() {
  return new Promise(resolve => {
    ipcMain.on('sync', (event, treeBase) => {
      const { sender } = event;
      const tree = new Baobab(treeBase);

      tree.on('update', event => {
        const path = event.data.paths[0];
        const data = tree.get(path);

        sender.send('update', path, data);
      });
      ipcMain.on('update', (event, path, data) => {
        if (isEqual(tree.get(path), data)) return;
        tree.set(path, data);
      });

      resolve(tree);
    });
  });
}

export function rendererTree(treeBase) {
  const tree = new Baobab(treeBase);

  tree.on('update', event => {
    const path = event.data.paths[0];
    const data = tree.get(path);

    ipcRenderer.send('update', path, data);
  });

  ipcRenderer.on('update', (event, path, data) => {
    if (isEqual(tree.get(path), data)) return;
    tree.set(path, data);
  });

  ipcRenderer.send('sync', tree.get());

  return tree;
}
