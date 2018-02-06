
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
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export class NewRoomInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      firebase.database().ref('rooms/').push().set({
        name: evt.target.value,
        users: { [this.props.userId]: true },
      });

      evt.preventDefault();
    }
  };

  render() {
    return (
      <Input placeholder="New room..." onKeyPress={this.onKeyPress} />
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
