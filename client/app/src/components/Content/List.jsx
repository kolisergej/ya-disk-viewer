import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

import './content.css';


function List(props) {
  const { currentId, history, items, onListItemPressed } = props;
  if (!Array.isArray(items)) {
    return <div className="empty">Empty folder</div>;
  }

  return (<ul className="list-group">
    { items.map(
        record => (
          <li key={record.id} className="list-group-item">
            <ListItem
              record={record}
              currentId={currentId}
              history={history}
              onListItemPressed={onListItemPressed}
            />
          </li>
        ),
      )
    }
  </ul>);
}

List.propTypes = {
  currentId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  onListItemPressed: PropTypes.func.isRequired,
};

List.defaultProps = {
  items: null,
};

export default List;
