import axios from "../../config/axios";
import * as types from "../constant";

const agendaDispatch = (cust, data) => {
  return {
    type: cust,
    payload: data,
  };
};

export const getAgendas = () => (dispatch) => {
  axios
    .get("/agendas")
    .then((res) => {
      console.log(res.data, "agendasssss");
      dispatch(agendaDispatch(types.GET_AGENDAS, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postAgenda = (data, history) => (dispatch) => {
  axios
    .post("/createAgenda", data)
    .then((response) => {
      dispatch(getAgendas());
    })
    .catch((err) => console.log(err, "errors"));
};

export const editAgendas = (id, data, history) => (dispatch) => {
  axios
    .put(`/agendas/${id}`, data)
    .then((response) => {
      console.log(response.data);
      if (response.data) return dispatch(history.push("/agendas"));
    })
    .catch((err) => console.log(err, "errors"));
};
const deleteAgenda = (id) => (dispatch) => {
  console.log(id, "redux id");
  axios.delete(`//${id}`).then((res) => {
    console.log(res.data);
    dispatch(getAgendas());
  });
};
