import React from 'react';
import styles from './SearchItem.css';

export default ({ item }) => {
  console.log("@item", item)
  return (
    <div className={styles.flex}>
      <img className={styles.thumbnail} src={item.snippet.thumbnails.default.url}/>
      <div>
        <div>{item.snippet.title}</div>
        <div>{item.snippet.description}</div>
      </div>
    </div>
  );
};
