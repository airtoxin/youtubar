/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className="window">
        <header className={styles.header}>
          🔍
          <input className={styles.input} placeholder="Search"/>
        </header>
        <div className="window-content">
          <div className="pane-group">
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number.isRequired,
};

export default branch({
  count: ['count'],
}, App);
