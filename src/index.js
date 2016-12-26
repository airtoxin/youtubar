import menubar from 'menubar';

const mb = menubar({
  index: `file://${process.cwd()}/dest/renderer/index.html`,
  alwaysOnTop: true,
});

mb.on('after-create-window', () => {
  mb.window.openDevTools();
});
