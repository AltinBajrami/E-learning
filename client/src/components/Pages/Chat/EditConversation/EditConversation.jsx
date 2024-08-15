import React, { useState, useEffect } from 'react';
import customFetch from '../../../utilities/customFetch';
import { toast } from 'react-toastify';
import '../CreateConversation/createConversation.scss';
import AllUsers from '../../../molecules/AllUsers/AllUsers';
import SelectedUsers from '../../../molecules/SelectedUsers/SelectedUsers';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const EditConversation = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const { id: conversationId } = useParams();
    const navigate = useNavigate();
    const { user: { userId } } = useOutletContext()

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await customFetch.get('/users');
                const { data } = await customFetch.get('/conversations/' + conversationId);
                setAllUsers(res.data.users.filter(u => u._id !== userId));
                setGroupName(data?.conversation?.groupName);
                setSelectedUsers(data?.conversation?.members.filter(u => u._id !== userId));
                setAllUsers(res.data.users.filter(u => u._id !== userId));
            } catch (err) {
                toast.error(err?.response?.data?.msg);
            }
        }
        getUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUsers.length < 1) {
                toast.error('Please select at least one user');
                return;
            }
            if (selectedUsers.length > 2 && !groupName) {
                toast.error('Please add a group name');
                return;
            }
            const data = new FormData();
            data.append('groupName', groupName);
            data.append('photo', photo);
            selectedUsers.forEach(user => {
                data.append('members', user._id)
            });

            data.append('members', userId)

            await customFetch.patch('/conversations/' + conversationId, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Successfully updated conversation');
            return navigate('/dashboard/chat')
        } catch (error) {
            console.error('Error creating conversation:', error);
            toast.error(error?.response?.data?.msg || 'failed to update conversation,try again later');
        }
    }

    const handleAddUser = (id) => {
        setSelectedUsers([...selectedUsers, allUsers.find(s => s._id === id)]);
    }

    const removeUser = (id) => {
        setSelectedUsers(selectedUsers.filter(s => s._id !== id));
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'groupName') {
            setGroupName(value);
        } else if (name === 'photo' && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    return (
        <div className="createConversation">
            <div className='createConversation-center'>
                <h2>Update conversation</h2>

                <form onSubmit={handleSubmit}>
                    <div className="formRow">
                        <label>Group name:</label>
                        <input type="text" name='groupName' value={groupName} onChange={handleChange} />
                    </div>
                    <div className="formRow">
                        <label>Photo</label>
                        <input type="file" name='photo' onChange={handleChange} />
                    </div>
                    <div className="formRow">
                        <h3>Users in group</h3>
                        <SelectedUsers selectedUsers={selectedUsers} removeUser={removeUser} title={'group'} />

                        <h3>All users</h3>
                        <AllUsers allUsers={allUsers} selectedUsers={selectedUsers} handleAddUser={handleAddUser} />
                    </div>
                    <button type="submit" className='glow-on-hover'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditConversation;
