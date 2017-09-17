import React from 'react';
import PropTypes from 'prop-types';


function BackRef(props) {
  return (<div>
    <a href="" onClick={props.onClick}>
      Previous level
    </a>
  </div>);
}

BackRef.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackRef;
