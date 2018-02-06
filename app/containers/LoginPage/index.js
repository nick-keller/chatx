
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginWithFacebook } from 'containers/App/actions';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Container = styled.div`
  position: absolute;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #4468B0;
  color: white;
  text-align: center;
  line-height: 100vh;
`;

const Button = styled.button`
  border: solid 1px white;
  padding: 0 20px;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: white;
    color: #4468B0;
  }
`;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <Button onClick={this.props.facebookLogin}>
          <Icon icon="facebook" type="b" /> Facebook
        </Button>
      </Container>
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
