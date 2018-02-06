
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentRoomId, makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';
import Icon from 'components/Icon';

import SendButton from './SendButton';
import MessageInput from './MessageInput';
import SendContainer from './SendContainer';

export class MessageBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.sendMessage();
      evt.preventDefault();
    }
  };

  onChange = (evt) => {
    this.setState({ message: evt.target.value });
  };

  sendMessage = () => {
    // Prevent sending empty messages
    if (!this.state.message) {
      return;
    }

    firebase.database().ref(`messages/${this.props.currentRoomId}`).push().set({
      message: this.state.message,
      user: this.props.currentUserId,
    });

    this.setState({ message: '' });
  };

  render() {
    return (
      <SendContainer>
        <MessageInput
          onChange={this.onChange}
          value={this.state.message}
          placeholder="Type a message..."
          onKeyPress={this.onKeyPress}
        />
        <SendButton onClick={this.sendMessage}>
          <Icon icon="paper-plane" />
        </SendButton>
      </SendContainer>
    );
  }
}

MessageBox.propTypes = {
  currentRoomId: PropTypes.string,
  currentUserId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentRoomId: makeSelectCurrentRoomId(),
  currentUserId: makeSelectCurrentUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(MessageBox);
