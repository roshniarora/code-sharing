import axios from '../../config/axios';
import { userReducer } from '../reducers/userReducer';
import { message } from 'antd';

export const setUser = (user) => {
  return { type: 'SET_USER', payload: user };
};

export const startLoginUser = (formData, redirect) => (dispatch) => {
  // console.log('action generator', formData);
  axios
    .post('/users/login', formData)
    .then((response) => {
      if (response.data.hasOwnProperty('errors')) {
        message.error(response.data.message);
      } else {
        message.success('sucessfully logged in');
        localStorage.setItem('authToken', response.data.token);
        axios
          .get('/users/account', {
            headers: {
              Authorization: localStorage.getItem('authToken'),
            },
          })
          .then((response) => {
            const user = response.data;
            dispatch(setUser(user));
            redirect();
          })
          .catch((err) => {
            message.error(err);
          });
      }
    })
    .catch((err) => {
      message.error(JSON.stringify(err));
    });
};

// export const startGetUser = () => (dispatch) => {
//   axios
//     .get('/users/ccount', {
//       headers: {
//         Authorization: localStorage.getItem('authToken'),
//       },
//     })
//     .then((response) => {
//       const user = response.data;
//       dispatch(setUser(user));
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

export const startRegisterUser = (values, redirect) => (dispatch) => {
  axios
    .post('/users/register', values)
    .then((response) => {
      // console.log(response.data, 'data');
      if (response.data.hasOwnProperty('errors')) {
        message.error(response.data.message);
      } else {
        message.success('you have registered successfully');
        redirect();
      }

      // dispatch(history.push('/users/login'))
    })
    .catch((err) => {
      console.log(err, 'error');
    });
};

export const startLogoutUser = () => (dispatch) => {
  axios.delete('/users/logout').then((response) => {
    if (response.data.notice) {
      alert(response.data.notice);
      localStorage.removeItem('token');
      dispatch(setUser({}));
      window.location.href = '/';
    }
  });
};
