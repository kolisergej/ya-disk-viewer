import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Content from '../Content';
import isUserSignedIn from '../../redux/models/user';
import { AuthButton, SignOutButton } from '../AuthButtons';

function App(props) {
  return (
    <div>
      <h2>Yandex Disk Viewer</h2>
      <AuthButton provider="yandex" />
      <SignOutButton />
      { props.userSignedIn && <Content /> }
    </div>
  );
}

App.propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    userSignedIn: isUserSignedIn(state),
  };
}

export default connect(mapStateToProps)(App);
