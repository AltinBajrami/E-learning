import axios from 'axios';
import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './editStudents.scss'
import SelectedUsers from '../../../molecules/SelectedUsers/SelectedUsers';
import AllUsers from '../../../molecules/AllUsers/AllUsers';
import customFetch from '../../../utilities/customFetch';

export const loader = async ({ params }) => {
    const { data } = await customFetch.get('/users', { withCredentials: true })
    const response = await customFetch.get('/classes/' + params.id, { withCredentials: true });
    return { students: data.users.filter(user => user.role === 'student'), classObj: response?.data?.class };
}

const EditStudents = () => {
    const { students, classObj } = useLoaderData();
    const [addedStudents, setAddedStudents] = useState(classObj?.students);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(students);
            await customFetch.put('/classes/' + classObj._id +
                '/edit-students', { students: addedStudents }, { withCredentials: true });

            toast.success('Students updated successfully');
            return navigate('/dashboard/classes')
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    }

    const handleAddStudent = (id) => {
        setAddedStudents([...addedStudents, students.find(s => s._id === id)]);
    }
    const removeStudent = (id) => {
        setAddedStudents(addedStudents.filter(s => s._id !== id));
    }

    return (
        <div className='editStudents'>
            <div className="headerInfo">
                <h2>{classObj?.title}</h2>
                <button className='glow-on-hover' onClick={handleSubmit}>Save</button>
            </div>

            <h3>Students in class</h3>
            <SelectedUsers selectedUsers={addedStudents} removeUser={removeStudent} />

            <h3>All students</h3>
            <AllUsers allUsers={students} selectedUsers={addedStudents} handleAddUser={handleAddStudent} />
        </div>
    )
}

export default EditStudents