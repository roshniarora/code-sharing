import * as types from '../constant';

const initialState = {
  agendas: [],
};

const agendasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AGENDAS:
      return { ...state, agendas: action.payload };

    default:
      return { ...state };
  }
};
export default agendasReducer;
