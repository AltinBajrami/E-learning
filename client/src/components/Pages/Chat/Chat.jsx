import React, { useState } from 'react'
import "../../../styles/main.scss";

import avatar from "../../../assets/images/avatar.png";
import { Link, useOutletContext } from "react-router-dom";
import ChatComponent from './ChatComponent';


const Chat = () => {
  const { user, socket } = useOutletContext();
  return (
    <section className="tasks-section">
      <ChatComponent userId={user.userId} avatar={avatar} socket={socket} />
    </section>
  )
}

export default Chat

