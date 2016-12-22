import menubar from 'menubar';
import main from './browser';

const mb = menubar();

main(mb.window);
