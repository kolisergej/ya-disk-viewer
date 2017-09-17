import React from 'react';
import PropTypes from 'prop-types';

function ListItem(props) {
  const { record, history, currentId } = props;
  return (<div>
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        if (!record.size) {
          const currentHistory = history.slice(0);
          currentHistory.push(currentId);
          props.onListItemPressed(record.id, currentHistory);
        }
      }}
    >
      { props.record.path }
    </a>
    { record.size ? <span>Size {record.size}</span> : null }
  </div>);
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
