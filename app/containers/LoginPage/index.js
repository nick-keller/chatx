
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginWithFacebook } from 'containers/App/actions';

import Icon from 'components/Icon';
import FacebookButton from 'components/FacebookButton';
import LoginContainer from 'components/LoginContainer';

/**
 * A simple button in the middle of the screen
 */
export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LoginContainer>
        <FacebookButton onClick={this.props.facebookLogin}>
          <Icon icon="facebook" type="b" /> Facebook
        </FacebookButton>
      </LoginContainer>
    );
  }
}

LoginPage.propTypes = {
  facebookLogin: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    facebookLogin: () => dispatch(loginWithFacebook()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginPage);
