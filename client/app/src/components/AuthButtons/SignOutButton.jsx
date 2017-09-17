import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from 'redux-oauth';
import isUserSignedIn from '../../redux/models/user';


function SignOutButton(props) {
  if (!props.userSignedIn) {
    return null;
  }

  const handleClick = () => {
    const { dispatch } = props;

    dispatch(signOut());
  };

  return (<input
    type="button"
    onClick={handleClick}
    value="Выйти"
  />);
}

SignOutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userSignedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { userSignedIn: isUserSignedIn(state) };
}

export default connect(mapStateToProps)(SignOutButton);
