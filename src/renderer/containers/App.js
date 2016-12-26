/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './App.css';
import { search } from '../actions';

class App extends Component {
  constructor(props) {
    super();

    this.state = { searchQuery: props.searchQuery };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleKeypress(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.props.dispatch(search, this.state.searchQuery);
    }
  }

  render() {
    return (
      <div className="window">
        <header className={styles.header}>
          🔍
          <input
            className={styles.input}
            placeholder="Search"
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}/>
        </header>
        <div className="window-content">
          {JSON.stringify(this.props.searchItems)}
          <div className="pane-group">
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchItems: PropTypes.array,
};

export default branch({
  searchQuery: ['search', 'query'],
  searchItems: ['search', 'items'],
}, App);
