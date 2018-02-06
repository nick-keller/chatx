
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentRoomId, makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';
import { makeSelectDisplayName, makeSelectPhotoURL } from 'containers/HomePage/selectors';

const Container = styled.div`
  padding: 20px 12px 20px 50px;
  position: relative;
`;

const Name = styled.div`
  color: rgba(0, 0, 0, .40);
`;

const Bubble = styled.div`
  background: #F1F0F0;
  border-radius: 18px;
  padding: 6px 12px;
  margin: 1px 0;
  max-width: 95%;
  line-height: 17px;
  display: inline-block;
`;

const Photo = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background: #4e4e4e;
  position: absolute;
  left: 12px;
  bottom: 21px;
  background-size: cover;
`;

export class MessageBulk extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <Name>
          { this.props.displayName }
        </Name>
        <Photo style={{ backgroundImage: `url(${this.props.photoURL})` }} />
        <div>
          { this.props.messages.map((message, id) => <div><Bubble key={id}>{message}</Bubble></div>) }
        </div>
      </Container>
    );
  }
}

MessageBulk.propTypes = {
  user: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  messages: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  displayName: makeSelectDisplayName(),
  photoURL: makeSelectPhotoURL(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(MessageBulk);
