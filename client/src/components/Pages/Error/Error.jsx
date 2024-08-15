import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import img from '../../../assets/images/not-found.svg';
import './Error.scss';
const Error = () => {
    const error = useRouteError();

    if (error.status === 404) {
        return <div className="error">
            <div className="error-center">
                <img src={img} alt="not found image" />
                <h3>Ohh!</h3>
                <p>We can't seem to find page your are looking for</p>
                <Link to={'/'}  >back home</Link>
            </div>
        </div>
    }
    return (
        <div className="error">
            <div className='error-center'>
                <h3>Something Went wrong</h3>
            </div>
        </div>
    )
}

export default Error