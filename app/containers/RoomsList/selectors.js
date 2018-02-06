import { createSelector } from 'reselect';
import { makeSelectCurrentRoomId } from 'containers/App/selectors';
import { makeSelectUsersById } from 'containers/HomePage/selectors';

const selectRooms = (state) => state.get('rooms');

const makeSelectRoomsIds = () => createSelector(
  selectRooms,
  (roomsState) => roomsState.get('ids').toJS(),
);

const makeSelectRoomsById = () => createSelector(
  selectRooms,
  (roomsState) => roomsState.get('roomsById'),
);

const makeSelectRoom = () => createSelector(
  makeSelectRoomsById(),
  (_, props) => props.id,
  (roomsById, id) => roomsById.get(id),
);

const makeSelectRoomName = () => createSelector(
  makeSelectRoom(),
  (room) => room.get('name'),
);

const makeSelectFirstFourPhotoURL = () => createSelector(
  makeSelectRoom(),
  makeSelectUsersById(),
  (room, usersById) => room.get('users').keySeq().slice(0, 4) // First 4 users
    .map((id) => usersById.getIn([id, 'photoURL'])).toJS(), // Only get photoURL
);

const makeSelectIsCurrentRoom = () => createSelector(
  makeSelectCurrentRoomId(),
  (_, props) => props.id,
  (currentRoom, id) => currentRoom === id,
);

export {
  makeSelectRoomsIds,
  makeSelectRoomName,
  makeSelectIsCurrentRoom,
  makeSelectFirstFourPhotoURL,
};
