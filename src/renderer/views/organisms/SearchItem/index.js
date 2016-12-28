/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import Thumbnail from '../../atoms/Thumbnail';
import Title from '../../atoms/Title';
import { addQueue } from '../../../actions';
import { videoType } from '../../../proptypes';
import styles from './index.css';
import common from '../../common.css';

const SearchItem = ({ item, dispatch }) => (
  <div
    className={`${styles.container} ${common.flexRow} ${common.noselect} ${styles.hoverAnimation}`}
    onClick={() => dispatch(addQueue, item)}
  >
    <Thumbnail src={item.snippet.thumbnails.default.url} />
    <div>
      <Title title={item.snippet.title} />
    </div>
  </div>
);

SearchItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: videoType.isRequired,
};

export default branch({
}, SearchItem);
