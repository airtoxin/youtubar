/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes, Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import TrashIcon from 'react-icons/lib/fa/trash-o';
import styles from './QueueItem.css';
import { deleteFromQueue } from '../actions';

class QueueItem extends Component {
  constructor() {
    super();

    this.state = { hover: false };
  }

  renderTrash() {
    return (
      <button
        className={styles.trash}
        onClick={() => this.props.dispatch(deleteFromQueue, this.props.index)}
      >
        <TrashIcon />
      </button>
    );
  }

  render() {
    const { item } = this.props;

    return (
      <div
        className={`${styles.container} ${styles.flex} ${styles.noselect}`}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <img
          className={styles.thumbnail}
          src={item.snippet.thumbnails.default.url}
          alt="thumbnail"
        />
        <div>
          <span className={styles.title}>{item.snippet.title}</span>
        </div>
        {this.state.hover ? this.renderTrash() : null}
      </div>
    );
  }
}

QueueItem.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.shape({
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
  }).isRequired,
};

export default branch({
}, QueueItem);
