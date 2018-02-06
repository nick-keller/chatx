import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as firebase from 'firebase';

import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentRoomId } from 'containers/App/selectors';
import { clearMessages, receivedMessage } from 'containers/Chat/actions';
import { makeSelectMessagesBulked } from 'containers/Chat/selectors';

import MessageBulk from 'containers/MessageBulk';
import MessageBox from 'containers/MessageBox';
import MessagesContainer from 'components/MessagesContainer';

import reducer from './reducer';

/**
 * The chat, the main focus of the app, composed of a large list of messages and a message input at the bottom
 */
export class Chat extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.messagesRef = null;
  }

  componentDidMount() {
    this.getAllMessages(this.props.currentRoomId);
  }

  componentWillReceiveProps(nextProps) {
    // Only get all messages when we change room
    if (nextProps.currentRoomId !== this.props.currentRoomId) {
      this.getAllMessages(nextProps.currentRoomId);
    }
  }

  /**
   * Retrieves the last 10 messages of a room and listens for any new entry
   */
  getAllMessages(roomId) {
    this.props.clearMessages();

    // If we were already listening we stop
    if (this.messagesRef) {
      this.messagesRef.off('child_added');
    }

    this.messagesRef = firebase.database().ref(`messages/${roomId}`).limitToLast(10);

    this.messagesRef.on('child_added', (data) => {
      this.props.receivedMessage(data.key, data.val());

      // This hack is the least dirty way I found for triggering the scroll after the dom has been painted to the screen
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  scrollToBottom = () => {
    // We use the div we placed at the bottom of the list to scroll to the bottom
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <div>
        <MessagesContainer>
          { this.props.messages.map((bulk) => <MessageBulk key={bulk.id} {...bulk} />) }
          <div ref={(el) => { this.messagesEnd = el; }} />
        </MessagesContainer>
        <MessageBox />
      </div>
    );
  }
}

Chat.propTypes = {
  currentRoomId: PropTypes.string,
  receivedMessage: PropTypes.func,
  messages: PropTypes.array,
  clearMessages: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentRoomId: makeSelectCurrentRoomId(),
  messages: makeSelectMessagesBulked(),
});

function mapDispatchToProps(dispatch) {
  return {
    receivedMessage: (id, message) => dispatch(receivedMessage(id, message)),
    clearMessages: () => dispatch(clearMessages()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chat', reducer });

export default compose(
  withReducer,
  withConnect,
)(Chat);
