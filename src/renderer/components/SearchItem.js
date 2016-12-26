import React from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './SearchItem.css';
import { addQueue } from '../actions';

const SearchItem = ({ item, dispatch }) => {
  return (
    <div
      className={`${styles.container} ${styles.flex} ${styles.noselect} ${styles.hoverAnimation}`}
      onClick={() => dispatch(addQueue, item)}
    >
      <img className={styles.thumbnail} src={item.snippet.thumbnails.default.url}/>
      <div>
        <span className={styles.title}>{item.snippet.title}</span>
      </div>
    </div>
  );
};

export default branch({
}, SearchItem);
