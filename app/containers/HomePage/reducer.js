import { fromJS } from 'immutable';
import { UPDATE_USERS_LIST } from 'containers/HomePage/constants';

const initialState = fromJS({
  ids: [],
  usersById: {},
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERS_LIST:
      return state
        .set('ids', fromJS(Object.keys(action.usersById)))
        .set('usersById', fromJS(action.usersById));
    default:
      return state;
  }
}

export default chatReducer;
