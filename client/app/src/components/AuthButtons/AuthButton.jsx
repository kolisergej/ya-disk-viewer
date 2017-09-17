import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { oAuthSignIn } from 'redux-oauth';
import isUserSignedIn from '../../redux/models/user';

function AuthButton(props) {
  const { userSignedIn } = props;
  if (userSignedIn) {
    return null;
  }

  const handleClick = () => {
    const { dispatch, provider } = props;
    dispatch(oAuthSignIn({ provider }));
  };

  return (<input
    type="button"
    value="Authorize via Yandex.Disc"
    onClick={handleClick}
  />);
}

AuthButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  userSignedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { userSignedIn: isUserSignedIn(state) };
}

export default connect(mapStateToProps)(AuthButton);
