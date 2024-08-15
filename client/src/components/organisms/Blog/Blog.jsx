import Item from '../../molecules/Item/Item';
import './Blog.scss';
import img from '../../../assets/images/mountain.jpg';
import pfp from '../../../assets/images/pfp.png';
import FigmaHeader from '../FigmaHeader/FigmaHeader';

import { BiArrowFromLeft } from 'react-icons/bi';

const Blog = () => {
  return (
    <>
    <FigmaHeader />
    <div className="blog">
      <div className="blog__content">
        <div className='blog__content-title'>
          <h2>Blog</h2>
          <p>Introducing our latest innovation: a seamless time off approval system designed to simplify the process for both employees and managers</p>
        </div>
        <button className='blog__content-button'>See all<BiArrowFromLeft /></button>
      </div>
      <div className="blog__container">
        <Item imgUrl={img} date = "March 27, 2024" blog="User interviews and design explorations about UX/UI Trends" personPhoto={pfp} personName="Olivia Baker" />
        <Item imgUrl={img} date="March 27, 2024" blog="User inteviews and design" personPhoto={pfp} personName="Olivia Baker" />
        <Item imgUrl={img} date="March 27, 2024" blog="User inteviews and design" personPhoto={pfp} personName="Olivia Baker" />
        <Item imgUrl={img} date="March 27, 2024" blog="User inteviews and design" personPhoto={pfp} personName="Olivia Baker" />
      </div>
    </div>
    </>
  );
};

export default Blog;
