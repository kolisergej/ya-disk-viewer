import React from 'react';
import PropTypes from 'prop-types';

import './content.css';

function ListItem(props) {
  const { record, history, currentId } = props;
  const item = record.size ? (<div className="item-row">
    <span>{props.record.path.split('/').slice(-1)[0]}</span>
    <span>{record.size} bytes</span>
  </div>) : (<a
    href=""
    onClick={(e) => {
      e.preventDefault();
      const currentHistory = history.slice(0);
      currentHistory.push(currentId);
      props.onListItemPressed(record.id, currentHistory);
    }}
  >
    { props.record.path.split('/').slice(-1)[0] }
  </a>);

  return item;
}

ListItem.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string.isRequired,
    size: PropTypes.number,
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentId: PropTypes.string.isRequired,
  onListItemPressed: PropTypes.func.isRequired,
};

export default ListItem;
