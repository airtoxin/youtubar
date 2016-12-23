/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';

class App extends Component {
  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Header</h1>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-sm sidebar">...</div>
            <div className="pane">...</div>
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
