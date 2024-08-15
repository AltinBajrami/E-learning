import React from 'react';
import { IoMdClose } from "react-icons/io";
import './selectedUsers.scss'

const SelectedUsers = ({ selectedUsers, removeUser }) => {
    return (
        <div className="users">
            {selectedUsers.length === 0 ? <h3>No user selected, add some</h3> :
                selectedUsers.map(user => (
                    <article key={user._id} className='user'>
                        <p>{user.firstName} {user.lastName}</p>
                        <button style={{ color: 'red ' }} onClick={() => removeUser(user._id)}>
                            <IoMdClose /></button>
                    </article>
                ))
            }
        </div>
    );
};

export default SelectedUsers;
