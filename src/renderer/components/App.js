import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import { branch } from 'baobab-react/higher-order';
import styles from './App.css';
import { search } from '../actions';
import SearchItem from './SearchItem';
import QueueItem from './QueueItem';

class App extends Component {
  constructor(props) {
    super();

    this.inputElement = null;

    this.state = {
      searchQuery: props.searchQuery,
      sidebarOpen: false,
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.inputElement) this.inputElement.focus();
  }

  onSetSidebarOpen(open) {
    this.setState({ ...this.state, sidebarOpen: open });
  }

  handleChange(event) {
    this.setState({ ...this.state, searchQuery: event.target.value });
  }

  handleKeypress(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.props.dispatch(search, this.state.searchQuery);
    }
  }

  handleClick() {
    this.setState({ ...this.state, sidebarOpen: true });
  }

  renderMainContent() {
    return (
      <div>
        <header className={styles.header}>
          🔍
          <input
            className={styles.input}
            placeholder="Search"
            ref={input => (this.inputElement = input)}
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}
          />
          <button className={styles.menuButton} onClick={this.handleClick}>三</button>
        </header>
        <div>
          {this.props.searchItems.map(item => (
            <SearchItem key={item.id.videoId} item={item} />
          ))}
        </div>
      </div>
    );
  }

  renderSidebarContent() {
    return (
      <div className={styles.sidebar}>
        {this.props.queue.map((item, i) => (
          <QueueItem key={`${item.id.videoId}-${i}`} item={item} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <Sidebar
        sidebar={this.renderSidebarContent()}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight
      >
        {this.renderMainContent()}
      </Sidebar>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchItems: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};

export default branch({
  searchQuery: ['search', 'query'],
  searchItems: ['search', 'items'],
  queue: ['queue'],
}, App);
