import React, { useState } from 'react'
import Sidebar from '../../organisms/Sidebar/Sidebar';
import search_icon from "../../../assets/images/search_icon.png";
import x_delete from "../../../assets/images/x_delete.png";
import avatar from "../../../assets/images/avatar.png";
import { Link } from "react-router-dom";



const pages = [
  "Dashboard",
  "Projects",
  "Task list",
  "Services",
  "Notifications",
  "Chat",
];


const TaskList = () => {
  return (
    <section className="tasks-section">
      <div className="tasks-summary">
        <div className="summary-items">
          <h2>TaskList Page</h2>
        </div>
      </div>
    </section>
  )
}

export default TaskList
