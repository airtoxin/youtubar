/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './SearchItem.css';
import { addQueue } from '../actions';

const SearchItem = ({ item, dispatch }) => (
  <div
    className={`${styles.container} ${styles.flex} ${styles.noselect} ${styles.hoverAnimation}`}
    onClick={() => dispatch(addQueue, item)}
  >
    <img
      className={styles.thumbnail}
      src={item.snippet.thumbnails.default.url}
      alt="thumbnail"
    />
    <div>
      <span className={styles.title}>{item.snippet.title}</span>
    </div>
  </div>
);

SearchItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }),
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
    }),
  }).isRequired,
};

export default branch({
}, SearchItem);
