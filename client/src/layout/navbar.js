import React, { useState, useEffect } from 'react';
import { Menu, Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import './navbar.css';

const { Header } = Layout;

const Navbar = (props) => {
  const history = useHistory();
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('authToken'));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/users/login');
  };
  return (
    // <Header>
    <div>
      {!token && (
        <Menu mode='horizontal'>
          <Menu.Item>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/users/register'>Register</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/users/login'>Login</Link>
          </Menu.Item>
        </Menu>
      )}
      {token && (
        <Menu mode='horizontal'>
          {/* <Menu.Item>
            <Link to='/'>Home</Link>
          </Menu.Item> */}
          <Menu.Item className='float-right'>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </Menu.Item>
        </Menu>
      )}
    </div>
    // </Header>
  );
};
export default connect()(Navbar);
