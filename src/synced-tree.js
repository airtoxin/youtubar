import Baobab from 'baobab';
import { ipcMain, ipcRenderer } from 'electron';
import { isEqual } from 'lodash';

export function browserTree() {
  return new Promise((resolve) => {
    ipcMain.on('sync', (syncEvent, treeBase) => {
      const { sender } = syncEvent;
      const tree = new Baobab(treeBase);

      tree.on('update', (treeEvent) => {
        const path = treeEvent.data.paths[0];
        const data = tree.get(path);

        sender.send('update', path, data);
      });
      ipcMain.on('update', (updateEvent, path, data) => {
        if (isEqual(tree.get(path), data)) return;
        tree.set(path, data);
      });

      resolve(tree);
    });
  });
}

export function rendererTree(treeBase) {
  const tree = new Baobab(treeBase);

  tree.on('update', (updateEvent) => {
    const path = updateEvent.data.paths[0];
    const data = tree.get(path);

    ipcRenderer.send('update', path, data);
  });

  ipcRenderer.on('update', (updateEvent, path, data) => {
    if (isEqual(tree.get(path), data)) return;
    tree.set(path, data);
  });

  ipcRenderer.send('sync', tree.get());

  return tree;
}
