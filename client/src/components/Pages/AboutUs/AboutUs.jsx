import React from 'react';
import './AboutUs.scss';
import Section from '../../molecules/Section/Section';
import library from '../../../assets/images/lib.jpg';
import header from '../../../assets/images/header.jpg';
import lockers from '../../../assets/images/lockers.jpg';
import study from '../../../assets/images/study.jpg';
import arts from '../../../assets/images/arts.png';
import graduation from '../../../assets/images/graduation.jpg';
import FigmaHeader from '../../organisms/FigmaHeader/FigmaHeader';
import Footer from '../../organisms/Footer/Footer';
import Navbar from '../../organisms/Navbar/Navbar';

const AboutUs = () => {
  const contentItems = [
    {
      title: 'Our Mission',
      description: 'At E-Learning Academy, our mission is to democratize education by providing accessible, high-quality learning experiences for everyone, everywhere. We believe that education is a fundamental right and should be available to all, regardless of geographical, financial, or social barriers. Our platform offers a wide range of courses designed to help learners achieve their personal and professional goals.',
      buttonText: 'View More',
      imgUrl: graduation,
    },
    {
      title: 'Why We Created E-Learning Academy',
      description: 'The idea of E-Learning Academy was born out of our collective experiences as students and professionals. We noticed significant gaps in traditional education systems, such as limited access to resources, lack of personalized learning, and the high costs associated with quality education. Our team, composed of passionate educators, technologists, and designers, decided to create a solution that addresses these issues.',
      buttonText: 'View More',
      imgUrl: lockers,
    },
    {
      title: 'Our Vision',
      description: 'Our vision is to create a global learning community where knowledge is freely shared, and opportunities for growth are abundant. We envision a world where anyone can learn anything, at any time, and from anywhere. By leveraging technology, we strive to create a platform that supports lifelong learning and continuous personal development.',
      buttonText: 'View More',
      imgUrl: library,
    },
  ];

  return (
    <>
    <Navbar />
      <FigmaHeader
        imgSrc={header}
        title="Empowering Learners Everywhere"
        description="Education is a fundamental right and should be available to all, regardless of geographical, financial, or social barriers"
        buttonLabel="Learn more"
      />
      <div className="about-us">
        <div className="about-us__header">
          <h1>Preparing Students to Achieve Success</h1>
          <p>E-Learning Academy is committed to making a positive impact on society and the environment. We strive to operate sustainably and ethically, promoting initiatives that support education for underprivileged communities and reduce our carbon footprint.</p>
        </div>
        <section>
          {contentItems.map((item, index) => (
            <Section
              key={index}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              imgUrl={item.imgUrl}
              reverse={index % 2 !== 0}
            />
          ))}
        </section>
        <div className='about-us__features'>
          <h1>Innovative Features</h1>
          <div className="about-us__features-grid">
            <div className="about-us__features-grid__item">
              <h2>Learning Modules</h2>
              <p>Our courses are designed with interactive elements such as quizzes, simulations, and hands-on projects to ensure active participation and better retention of information. These modules allow learners to apply their knowledge in real-world scenarios, making learning more practical and engaging.</p>
            </div>
            <div className="about-us__features-grid__item">
              <h2>Mobile Learning</h2>
              <p>Understanding the need for flexibility, our platform is fully optimized for mobile devices. Learners can access courses and study materials on-the-go, ensuring that they can learn at their convenience, anytime and anywhere. Our mobile app provides a seamless learning experience across all devices.</p>
            </div>
            <div className="about-us__features-grid__item">
              <h2>Gamification</h2>
              <p>To make learning fun and motivating, we incorporate gamification elements such as badges, leaderboards, and progress tracking. Learners can earn rewards as they complete modules and achieve milestones, which helps maintain their motivation and encourages continuous learning.</p>
            </div>
            <div className="about-us__features-grid__item">
              <h2>Virtual Studys</h2>
              <p>Our virtual studys offer a collaborative learning environment where learners can interact with instructors and peers in real-time. Features such as live lectures, Q&A sessions, and breakout rooms facilitate dynamic discussions and enhance the overall learning experience.</p>
            </div>
          </div>
        </div>
        <div className="about-us__partners">
          <div className="about-us__partners-info">
            <p>We believe in the power of collaboration. E-Learning Academy partners with leading universities, organizations, and industry experts to provide high-quality educational content. These partnerships ensure that our courses are relevant, up-to-date, and aligned with industry standards.</p>
          </div>
        </div>
        <div className='about-us__commitment'>
          <div className="about-us__commitment-column">
            <h2>Commitment to Excellence</h2>
            <p>Quality is at the heart of everything we do at E-Learning Academy. From course content to user experience, we are committed to providing the highest standards of education. We work closely with our instructors to ensure that our courses are up-to-date, relevant, and engaging. Our platform is continuously improved based on user feedback, ensuring a seamless and enjoyable learning experience for all our users.</p>
          </div>
          <div className="about-us__commitment-column">
            <h2>Looking Ahead</h2>
            <p>Looking ahead, we plan to expand our course offerings, enhance our technology, and build new features that make learning even more interactive and effective. We are exploring partnerships with universities and organizations to offer accredited programs and certifications. Our goal is to become a leading E-Learning platform that empowers millions of learners worldwide.</p>
          </div>
          <div className="about-us__commitment-column">
            <h2>Research and Development</h2>
            <p>Innovation is at the core of E-Learning Academy. Our dedicated research and development team continuously explores new technologies and methodologies to enhance the learning experience. From AI-driven personalized learning to virtual reality simulations, we are always at the forefront of educational innovation.</p>
          </div>

          <div className="about-us__commitment-column">
            <h2>Corporate Training Solutions</h2>
            <p>In addition to individual learning, E-Learning Academy offers customized corporate training solutions. Our platform helps companies upskill their workforce, improve productivity, and stay competitive in the rapidly evolving market. With tailored training programs, we address the specific needs of businesses across various industries.</p>
          </div>
        </div>
        <div className="about-us__gallery">
          <div className="about-us__gallery-item">
            <img src={study} alt="Study" />
          </div>
          <div className="about-us__gallery-item">
            <img src={arts} alt="Arts" />
          </div>
        </div>
        <div className="about-us__partners">
          <div className="about-us__partners-info">
            <p>We believe in the power of collaboration. E-Learning Academy partners with leading universities, organizations, and industry experts to provide high-quality educational content. These partnerships ensure that our courses are relevant, up-to-date, and aligned with industry standards.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
