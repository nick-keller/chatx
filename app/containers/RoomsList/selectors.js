import { createSelector } from 'reselect';
import { makeSelectCurrentRoomId } from 'containers/App/selectors';

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

const makeSelectIsCurrentRoom = () => createSelector(
  makeSelectCurrentRoomId(),
  (_, props) => props.id,
  (currentRoom, id) => currentRoom === id,
);

export {
  makeSelectRoomsIds,
  makeSelectRoomName,
  makeSelectIsCurrentRoom,
};
