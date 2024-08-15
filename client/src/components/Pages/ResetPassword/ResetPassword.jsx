import React, { useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ResetPassword.scss'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const query = useQuery();
    console.log(query.get('email'));
    const navigate = useNavigate();

    const validate = () => {
        return password !== confirmPassword;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error('please enter password');
            return;
        }
        if (validate()) {
            toast.error('password must be the same');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/auth/reset-password', {
                password,
                token: query.get('token'),
                email: query.get('email'),
            }, { withCredentials: true });
            toast.success(`Success, redirecting to login page shortly`)
            return navigate('/sign-in')
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return <form className='reset-form' method='post' onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '2rem', letterSpacing: '3px', textAlign: "center" }}>Reset password</h2>
        <div className="form-row">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
        </div>
        <div className="form-row">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input type="password" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-input' />
        </div>
        <button type="submit" className='btn'>New Password</button>
    </form>
};




export default ResetPassword