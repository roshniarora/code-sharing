import React from "react";
import "./App.scss";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Agendas from "./components/rooms/Agendas";
import Navbar from "./layout/navbar";
import Layout from "./layout/layout";
import Room from "./components/rooms/room";
import otpPage from "./components/rooms/otpPage";
import PrivateRoute from "./components/utilities/privateRouting";
import RootModal from "./components/modals/rootModal";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Navbar />
      <RootModal />
      <div>
        <Layout>
          <Switch>
            <PrivateRoute path="/" component={Agendas} exact={true} />
            <Route path="/users/login" component={Login} />
            <Route path="/users/register" component={Register} />
            <PrivateRoute path="/users/agendas" component={Agendas} />
            {/* <Route path="/room" component={RoomLogin} /> */}
            <Route path="/otp" component={otpPage} />
            <Route path="/:otp" component={Room} />
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
