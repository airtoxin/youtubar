/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <div className={`title ${styles.flex}`}>
            <div>Header</div>
            <div className={styles.right}>Clear</div>
          </div>
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
