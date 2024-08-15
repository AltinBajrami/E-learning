import React from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import './createClass.scss'
import customFetch from '../../../utilities/customFetch';

export const loader = async () => {
    const { data } = await customFetch.get('/users');
    return { teachers: data.users.filter(user => user.role === 'teacher') };
}

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/classes', data);
        toast.success('Class created successfully');
        return redirect('/dashboard/classes');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const CreateClass = () => {
    const { teachers } = useLoaderData();
    return (
        <Form method='post' className='form-class-container'>
            <h2>Create Class</h2>
            <div className="form-class-row">
                <label>Class title:</label>
                <input type='text' name='title' />
            </div>
            <div className="form-class-row">
                <label>Select a teacher:</label>
                <select name='instructorId' defaultValue={teachers[0]?._id}>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.firstName} {teacher.lastName}</option>
                    ))}
                </select>
            </div>
            <div className="form-class-row">
                <label>description:</label>
                <textarea name='description' width='100%'></textarea>
            </div>
            <button type='submit' className='glow-on-hover'>Submit</button>
        </Form>
    )
}

export default CreateClass