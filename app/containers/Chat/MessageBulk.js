
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentRoomId, makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';
import { makeSelectDisplayName, makeSelectIsMe, makeSelectPhotoURL } from 'containers/HomePage/selectors';

const Container = styled.div`
  padding: 10px 12px 10px 50px;
  position: relative;
  
  &.me {
    text-align: right;
    padding: 10px 50px 10px 12px;
  }
`;

const Name = styled.div`
  color: rgba(0, 0, 0, .40);
  font-size: .8em;
`;

const Bubble = styled.div`
  background: #F1F0F0;
  border-radius: 18px;
  padding: 6px 12px;
  margin: 1px 0;
  max-width: 95%;
  line-height: 17px;
  display: inline-block;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  
  .me & {
    background: #1787FB;
    color: white;
    border-bottom-left-radius: 18px;
    border-top-left-radius: 18px;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
  }
  
  div:first-child > & {
    border-top-left-radius: 18px;
  }
  
  div:last-child > & {
    border-bottom-left-radius: 18px;
  }
  
  .me div:first-child > & {
    border-top-right-radius: 18px;
  }
  
  .me div:last-child > & {
    border-bottom-right-radius: 18px;
  }
`;

const Photo = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background: #4e4e4e;
  position: absolute;
  left: 12px;
  bottom: 11px;
  background-size: cover;
  
  .me & {
    right: 12px;
    left: auto;
  }
`;

export class MessageBulk extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container className={this.props.isMe ? 'me' : ''}>
        <Name>
          { this.props.displayName }
        </Name>
        <Photo style={{ backgroundImage: `url(${this.props.photoURL})` }} />
        <div>
          { this.props.messages.map((message, id) => <div key={id}><Bubble>{message}</Bubble></div>) }
        </div>
      </Container>
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

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(MessageBulk);
