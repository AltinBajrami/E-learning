import Item from '../../molecules/Item/Item';
import './Courses.scss';
import img from '../../../assets/images/girlcoding.png';
import arts from '../../../assets/images/artscourse.png';
import math from '../../../assets/images/alg.png';
import science from '../../../assets/images/science.png';
import pfp from '../../../assets/images/pfp.png';
import Navbar from '../../organisms/Navbar/Navbar';

import { BiArrowFromLeft } from 'react-icons/bi';
import Footer from '../../organisms/Footer/Footer';

const Blog = () => {
  return (
    <>
    <Navbar />
      <div className="blog">
        <div className="blog__content">
          <div className='blog__content-title'>
            <h2>Online Courses</h2>
            <p>We offer a huge variety of online courses your kids can choose from.</p>
          </div>
        </div>
        <div className="blog__container">
          <Item imgUrl={img} date="Available Now" blog="Coding for Kids" personPhoto={pfp} personName="Olivia Baker" />
          <Item imgUrl={science} date="Available Now" blog="Science Explorations" personPhoto={pfp} personName="Sarah Davis" />

          <Item imgUrl={arts} date="Available Now" blog="Art for Kids" personPhoto={pfp} personName="Emily Johnson" />
          <Item imgUrl={math} date="Available Now" blog="Math Fun" personPhoto={pfp} personName="Jane Doe" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
