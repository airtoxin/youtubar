/* eslint-disable jsx-a11y/no-marquee */
import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import MenuIcon from 'react-icons/lib/fa/bars';
import SearchIcon from 'react-icons/lib/fa/search';
import { branch } from 'baobab-react/higher-order';
import { search } from '../actions';
import SearchItem from './organisms/SearchItem';
import QueueItem from './organisms/QueueItem';
import Player from './pages/Player';
import Controller from './pages/Controller';
import Title from './atoms/Title';
import Corner from './molecules/Corner';
import { playerType, searchType, queueType } from '../proptypes';
import styles from './App.css';
import common from './common.css';

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
    const title = this.props.nowPlaying ? this.props.nowPlaying.snippet.title : '';
    return (
      <div className={`${styles.main} ${common.flexCol}`}>
        <header className={`${styles.header} ${styles.flexFixedHeader}`}>
          <marquee><Title title={title} /></marquee>
          <button className={styles.menuButton} onClick={this.handleClick}><MenuIcon /></button>
        </header>
        <div className={styles.flexScrollableContent}>
          {this.props.queue.map((item, i) => (
            <QueueItem key={`${item.id.videoId}-${i}`} item={item} index={i} />
          ))}
        </div>
        <footer className={styles.footer}>
          <Controller />
        </footer>
        <Player />
        <Corner />
      </div>
    );
  }

  renderSidebarContent() {
    // avoid to warping sidebar
    // disable focus because buggy
    // if (this.inputElement) setTimeout(() => this.inputElement.focus(), 100);

    return (
      <div className={`${styles.sidebar} ${common.flexCol}`}>
        <header className={`${styles.header} ${styles.flexFixedHeader}`}>
          <SearchIcon />
          <input
            className={styles.input}
            placeholder="Search"
            ref={input => (this.inputElement = input)}
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}
          />
        </header>
        <div className={styles.flexScrollableContent}>
          {this.props.searchItems.map(item => (
            <SearchItem key={item.id.videoId} item={item} />
          ))}
        </div>
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
  nowPlaying: playerType.nowPlayingType,
  searchQuery: searchType.queryType,
  searchItems: searchType.itemsType,
  queue: queueType,
};

export default branch({
  nowPlaying: ['player', 'nowPlaying'],
  searchQuery: ['search', 'query'],
  searchItems: ['search', 'items'],
  queue: ['queue'],
}, App);
