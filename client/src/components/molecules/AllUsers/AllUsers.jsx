import React from 'react';
import { IoMdAdd } from "react-icons/io";
import './allUsers.scss'

const AllUsers = ({ allUsers, selectedUsers, handleAddUser }) => {
    return (
        <div className="users">
            {allUsers.filter(user => !selectedUsers.find(s => s._id === user._id)).map(user => (
                <article key={user._id} className='user'>
                    <p>{user.firstName} {user.lastName}</p>
                    <button onClick={() => handleAddUser(user._id)}>
                        <IoMdAdd />
                    </button>
                </article>
            ))}
        </div>
    );
};

export default AllUsers;
