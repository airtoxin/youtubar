import React, { PropTypes } from 'react';
import styles from './index.css';

const Title = ({ title }) => (
  <span className={styles.title}>{title}</span>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
