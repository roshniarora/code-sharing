import * as types from '../constant';

const initialState = {
  agenda: {},
  rooms: [],
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROOM:
      return { ...state, agenda: action.payload };
    case types.PUSH_CODE:
      return { ...state, rooms: action.payload };

    default:
      return { ...state };
  }
};
export default roomsReducer;
