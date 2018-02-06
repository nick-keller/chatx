import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectCurrentUserId } from 'containers/App/selectors';
import { enterRoom } from 'containers/App/actions';
import * as firebase from 'firebase';

import Input from 'components/NewRoomInput';

/**
 * A simple input that creates a room when the user presses Enter
 */
export class NewRoomInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      // First we get the room id
      const roomsRef = firebase.database().ref('rooms/');
      const roomId = roomsRef.push().key;

      // Then we create the room
      roomsRef.child(roomId).set({
        name: evt.target.value,
        users: { [this.props.userId]: true },
      });

      // Then we enter the room freshly created
      this.props.enterRoom(roomId);
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
  enterRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectCurrentUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
    enterRoom: (id) => dispatch(enterRoom(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(NewRoomInput);
