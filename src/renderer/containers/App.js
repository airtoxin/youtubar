/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';

class App extends Component {
  render() {
    return (
      <div>
        <h1>hello, youtubar!</h1>
        <p>count: {this.props.count}</p>
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
