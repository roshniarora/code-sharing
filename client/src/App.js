import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from './components/static/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RoomLogin from './components/rooms/roomLogin';
import Agendas from './components/rooms/Agendas';
import Navbar from './layout/navbar';
import Layout from './layout/layout';
import AddAgenda from './components/rooms/addAgenda';

function App() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Layout>
          {/* {!token ? (
          <div>
            <h1> CODE SHARING </h1>
            <Link to='/'>Home</Link>
            <Link to='/users/register'>Register</Link>
            <Link to='/users/login'>Login</Link>
          </div>
        ) : (
          <div>
            <Link to='/users/roomLogin'>RoomForm</Link>{' '}
          </div>
        )} */}

          <Switch>
            <Route path='/' component={Home} exact={true} />
            <Route path='/users/login' component={Login} />
            <Route path='/users/register' component={Register} />
            <Route path='/users/roomLogin' component={RoomLogin} />
            <Route path='/users/agendas' component={Agendas} />
            <Route path='/users/addagendas' component={AddAgenda} />
            <Route path='/room' component={RoomLogin} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
