import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import styles from './App.css';
import { search } from '../actions';
import SearchItem from './SearchItem';

class App extends Component {
  constructor(props) {
    super();

    this.inputElement = null;

    this.state = { searchQuery: props.searchQuery };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    if (this.inputElement) this.inputElement.focus();
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
      <div>
        <header className={styles.header}>
          🔍
          <input
            className={styles.input}
            placeholder="Search"
            ref={input => (this.inputElement = input)}
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}/>
        </header>
        <div>
          {this.props.searchItems.map(item => (
            <SearchItem key={item.id.videoId} item={item}/>
          ))}
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
