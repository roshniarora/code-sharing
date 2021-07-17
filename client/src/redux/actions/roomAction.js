import axios from "../../config/axios";
import * as types from "../constant";

const otpDispatch = (cust, data) => {
  return {
    type: cust,
    payload: data,
  };
};

export const postRoom = (data, history) => (dispatch) => {
  axios
    .post("/room", data)
    .then((response) => {
      // dispatch(getAgendas());
    })
    .catch((err) => console.log(err, "errors"));
};

export const postRoomOtp = (data, history) => (dispatch) => {
  axios
    .post("/roomotp", data)
    .then((response) => {
      history.push(`/${response.data.otp}`);
    })
    .catch((err) => console.log(err, "errors"));
};
export const pushRoomOtp = (data, history) => (dispatch) => {
  dispatch(otpDispatch(types.PUSH_CODE, data));
};

export const getRoomOtp = (otp, history) => (dispatch) => {
  axios
    .get(`/${otp}`)
    .then((response) => {
      dispatch(otpDispatch(types.GET_ROOM, response.data));
      dispatch(otpDispatch(types.PUSH_CODE, response.data.rooms));
    })
    .catch((err) => console.log(err, "errors"));
};
