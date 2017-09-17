import React from 'react';
import PropTypes from 'prop-types';

function BackRef(props) {
  return (<a href="" onClick={props.onClick}>
    Previous level
  </a>);
}

BackRef.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackRef;
