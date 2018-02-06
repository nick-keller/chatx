
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';

const Input = styled.input`
  background: #F6F7F9;
  line-height: 30px;
  width: 230px;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 10px;
`;

export class NewRoomInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      firebase.database().ref('rooms/').push().set({
        name: evt.target.value,
        users: { [this.props.userId]: true },
      });

      this.setState({ name: '' });
      evt.preventDefault();
    }
  };

  onChange = (evt) => {
    this.setState({ name: evt.target.value });
  };

  render() {
    return (
      <Input
        onChange={this.onChange}
        value={this.state.name}
        placeholder="New room..."
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

NewRoomInput.propTypes = {
  userId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectCurrentUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(NewRoomInput);
