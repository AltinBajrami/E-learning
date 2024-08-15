import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RegisterImg from '../../../../assets/images/pfp.png';
import './InfoSection.scss';

const InfoSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="info-section">
      <h1>Learning That's Always On Your Side</h1>
      <p>
        e-Learning Academy is a platform to manage your education and track your
        progress.
      </p>
      <Slider {...settings}>
        <div className="testimonial">
          <p>
            e-Learning Academy is an amazing platform that has greatly helped me
            in tracking my learning progress. The resources and quizzes are very
            effective in ensuring that I stay on track.
          </p>
          <div className="user-info">
            <img src={RegisterImg} alt="Jane D." />
            <div>
              <strong>Jane D.</strong>
              <span>Student</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
            The e-Learning Academy has been instrumental in my studies. The
            interactive content and easy-to-follow courses make learning
            enjoyable.
          </p>
          <div className="user-info">
            <img src={RegisterImg} alt="John D." />
            <div>
              <strong>Anita D.</strong>
              <span>Student</span>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default InfoSection;
