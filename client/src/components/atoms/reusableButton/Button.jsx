import './Button.scss';
import { BiArrowFromLeft } from 'react-icons/bi';

const Button = ({ label }) => {
    return (
        <button className='button'>
            {label}
            <BiArrowFromLeft className='arrow' />
        </button>
    );
};

export default Button;
