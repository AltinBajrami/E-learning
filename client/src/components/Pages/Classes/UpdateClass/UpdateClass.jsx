import axios from 'axios';
import React from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../CreateClass/createClass.scss'
import customFetch from '../../../utilities/customFetch';

export const loader = async ({ params }) => {
    const { data } = await axios.get('http://localhost:4000/api/v1/users', { withCredentials: true })
    const response = await axios.get('http://localhost:4000/api/v1/classes/' + params.id, { withCredentials: true });
    return { teachers: data.users.filter(user => user.role === 'teacher'), classObj: response?.data?.class };
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.patch('/classes/' + params.id, data, { withCredentials: true });
        toast.success('Class updated successfully');
        return redirect('/dashboard/classes');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateClass = () => {
    const { teachers, classObj } = useLoaderData();
    return (
        <Form method='post' className='form-class-container'>
            <h2>Update Class</h2>
            <div className="form-class-row">
                <label>Class title:</label>
                <input type='text' name='title' defaultValue={classObj?.title} />
            </div>
            <div className="form-class-row">
                <label>Select a teacher:</label>
                <select name='instructorId' defaultValue={classObj?.instructor?._id}>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher._id}>{teacher.firstName} {teacher.lastName}</option>
                    ))}
                </select>
            </div>
            <div className="form-class-row">
                <label>description:</label>
                <textarea name='description' defaultValue={classObj?.description}></textarea>
            </div>
            <button type='submit' className='glow-on-hover'>Submit</button>
        </Form>
    )
}

export default UpdateClass