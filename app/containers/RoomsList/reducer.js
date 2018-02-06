
import { fromJS } from 'immutable';
import { UPDATE_ROOMS_LIST } from 'containers/RoomsList/constants';

const initialState = fromJS({
  ids: [],
  roomsById: {},
});

function roomsListReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROOMS_LIST:
      return state
        .set('ids', fromJS(action.roomsById ? Object.keys(action.roomsById) : []))
        .set('roomsById', fromJS(action.roomsById));
    default:
      return state;
  }
}

export default roomsListReducer;
