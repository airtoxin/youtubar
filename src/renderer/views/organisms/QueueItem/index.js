/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes, Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import TrashIcon from 'react-icons/lib/fa/trash-o';
import Thumbnail from '../../atoms/Thumbnail';
import Title from '../../atoms/Title';
import { deleteFromQueue } from '../../../actions';
import { videoType } from '../../../proptypes';
import styles from './index.css';
import common from '../../common.css';

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
        className={`${styles.container} ${common.flexRow} ${common.noselect}`}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <Thumbnail src={item.snippet.thumbnails.default.url} />
        <div>
          <Title title={item.snippet.title} />
        </div>
        {this.state.hover ? this.renderTrash() : null}
      </div>
    );
  }
}

QueueItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: videoType.isRequired,
};

export default branch({
}, QueueItem);
