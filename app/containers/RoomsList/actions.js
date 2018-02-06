import { CREATE_ROOM, UPDATE_ROOMS_LIST } from 'containers/RoomsList/constants';


export function updateRoomsList(roomsById) {
  return {
    type: UPDATE_ROOMS_LIST,
    roomsById,
  };
}
