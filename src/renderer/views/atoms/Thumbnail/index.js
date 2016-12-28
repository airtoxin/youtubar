import React, { PropTypes } from 'react';
import styles from './index.css';

const Thumbnail = ({ src }) => (
  <img className={styles.thumbnail} src={src} alt="thumbnail" />
);

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Thumbnail;
