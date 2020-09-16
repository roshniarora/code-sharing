import * as types from '../../constant';

const initialState = {
  agendas: [],
};

const AgendasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AGENDAS:
      return { ...state, agendas: action.payload };

    default:
      return { ...state };
  }
};
export default AgendasReducer;
