import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import './VerifyEmail.scss'
import Logo from '../../../assets/images/logo-no-background.png';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const query = useQuery();

    const verifyToken = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/auth/verify-email', {
                verificationToken: query.get('token'),
                email: query.get('email'),
            });
            console.log(data);
            toast.success(data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        verifyToken();
    }, []);

    if (loading) {
        return (
            <div className='verify-container'>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className='verify-container'>
                <h4>There was an error, please double check your verification link </h4>
            </div>
        );
    }

    return (
        <div className="verify-container">
            <div className="verify-info">
                <img src={Logo} alt="e-Learning Academy" className="logo" />
                <h2>Email confirmed Successfully!</h2>
                <Link to={'/sign-in'} className='btn-login'>Login</Link>
            </div>
        </div>
    );
}

export default VerifyEmail