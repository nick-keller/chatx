
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectDisplayName, makeSelectIsMe, makeSelectPhotoURL } from 'containers/HomePage/selectors';

import SenderName from 'components/SenderName';
import Bubble from 'components/Bubble';
import ProfilePicture from 'components/ProfilePicture';
import MessageBulkContainer from 'components/MessageBulkContainer';

/**
 * A message bulk is a group of consecutive messages by the same user
 */
export class MessageBulk extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MessageBulkContainer className={this.props.isMe ? 'me' : ''}>
        <SenderName>
          { this.props.displayName }
        </SenderName>
        <ProfilePicture url={this.props.photoURL} />
        <div>
          { this.props.messages.map((message, id) => <Bubble key={id} message={message} />) }
        </div>
      </MessageBulkContainer>
    );
  }
}

MessageBulk.propTypes = {
  user: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  messages: PropTypes.array,
  isMe: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  displayName: makeSelectDisplayName(),
  photoURL: makeSelectPhotoURL(),
  isMe: makeSelectIsMe(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(MessageBulk);
