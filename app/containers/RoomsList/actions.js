import { UPDATE_ROOMS_LIST } from 'containers/RoomsList/constants';

/**
 * Dispatched when the room list changes, typically when a user creates a room
 */
export function updateRoomsList(roomsById) {
  return {
    type: UPDATE_ROOMS_LIST,
    roomsById,
  };
}
