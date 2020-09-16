import axios from '../../config/axios';
import * as types from '../../constant';

const agendaDispatch = (cust, data) => {
  return {
    type: cust,
    payload: data,
  };
};

const getAgendas = () => (dispatch) => {
  axios
    .get('/agendas')
    .then((res) => {
      dispatch(agendaDispatch(types.GET_AGENDAS, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAgenda = (data, history) => (dispatch) => {
  axios
    .post('/users/addagenda', data)
    .then((response) => {
      if (response.data) return dispatch(history.push('/agendas'));
    })
    .catch((err) => console.log(err, 'errors'));
};
