import React, { useEffect, useState } from 'react';
import { postRoom } from '../../redux/actions/agendasAction';
import { connect } from 'react-redux';
import axios from '../../config/axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3040');

function Room(props) {
  const [agenda, setAgenda] = useState({});
  const [rooms, setRooms] = useState([]);

  socket.connect();

  useEffect(async () => {
    const otp = window.location.href.split('/');
    const result = await axios.get(`/${otp[3]}`);
    setAgenda(result.data);
    setRooms(result.data.rooms);
  }, []);

  const handleclick = () => {
    let value = window.prompt();
    if (value) {
      socket.emit('Code', {
        title: value,
        description: value,
        agenda: agenda._id,
        otp: agenda.otp,
      });
      props.postRoom({
        title: value,
        description: value,
        agenda: agenda._id,
      });
    }
  };
  socket.on(agenda.otp, (message) => setRooms([{ ...message }, ...rooms]));

  return (
    <div>
      <h1>asdlas</h1>
      <button onClick={handleclick}>alert</button>
      <ul>
        {rooms?.map((ele) => (
          <li>{ele?.title}</li>
        ))}
        {/* {dummy.map((ele) => (
          <li>{ele.title}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default connect(null, { postRoom })(Room);
