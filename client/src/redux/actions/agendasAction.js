import axios from '../../config/axios';
import * as types from '../constant';

const agendaDispatch = (cust, data) => {
  return {
    type: cust,
    payload: data,
  };
};

export const getAgendas = () => (dispatch) => {
  axios
    .get('/agendas')
    .then((res) => {
      console.log(res.data, 'agendasssss');
      dispatch(agendaDispatch(types.GET_AGENDAS, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postAgenda = (data, history) => (dispatch) => {
  axios
    .post('/createAgenda', data)
    .then((response) => {
      dispatch(getAgendas());
    })
    .catch((err) => console.log(err, 'errors'));
};
export const postRoom = (data, history) => (dispatch) => {
  axios
    .post('/room', data)
    .then((response) => {
      // dispatch(getAgendas());
    })
    .catch((err) => console.log(err, 'errors'));
};

export const editAgendas = (id, data, history) => (dispatch) => {
  axios
    .put(`/agendas/${id}`, data)
    .then((response) => {
      console.log(response.data);
      if (response.data) return dispatch(history.push('/agendas'));
    })
    .catch((err) => console.log(err, 'errors'));
};

export const postRoomOtp = (data, history) => (dispatch) => {
  axios
    .post('/roomotp', data)
    .then((response) => {
      history.push(`/${response.data.otp}`);
    })
    .catch((err) => console.log(err, 'errors'));
};
export const pushRoomOtp = (data, history) => (dispatch) => {
  dispatch(agendaDispatch(types.PUSH_CODE, data));
};

export const getRoomOtp = (otp, history) => (dispatch) => {
  axios
    .get(`/${otp}`)
    .then((response) => {
      dispatch(agendaDispatch(types.GET_ROOM, response.data));
      dispatch(agendaDispatch(types.PUSH_CODE, response.data.rooms));
    })
    .catch((err) => console.log(err, 'errors'));
};
