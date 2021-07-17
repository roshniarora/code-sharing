import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import Button from "../components/utilities/Button";
import "./navbar.css";

const Navbar = (props) => {
  const history = useHistory();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/users/login");
  };
  return (
    <header>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        {!token && (
          <Menu.Item>
            <Link to="/users/register">Register</Link>
          </Menu.Item>
        )}
        {!token && (
          <Menu.Item>
            <Link to="/users/login">Login</Link>
          </Menu.Item>
        )}
        {!token && (
          <Menu.Item>
            <Link to="/otp">OTP</Link>
          </Menu.Item>
        )}
        {token && (
          <Menu.Item className="float-right">
            <Button
              // buttonStyle="btn-outline"
              buttonColor="gradient"
              buttonSize="btn-large"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </header>
  );
};
export default connect()(Navbar);
