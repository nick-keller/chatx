import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as firebase from 'firebase';

import { makeSelectCurrentRoomId, makeSelectCurrentUserId } from 'containers/App/selectors';

import Icon from 'components/Icon/index';
import SendContainer from 'components/SendContainer/index';
import SendButton from 'components/SendButton/index';
import MessageInput from 'components/MessageInput/index';

/**
 * An horizontal container displayed at the bottom of the screen to send new messages
 */
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

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(MessageBox);
