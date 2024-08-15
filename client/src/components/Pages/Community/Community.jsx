import React from 'react';
import './Community.scss'; // Import your SCSS file
import Section from '../../molecules/Section/Section'; // Assuming you have a Section component
import Navbar from '../../organisms/Navbar/Navbar';
import Footer from '../../organisms/Footer/Footer';
import event_s from '../../../assets/images/event-s.webp';
import volunteer from '../../../assets/images/volunteer.webp';
import c_projects from '../../../assets/images/c_projects.webp';
import member_f from '../../../assets/images/member_f.webp';
import member_m from '../../../assets/images/member_m.webp';

const Community = () => {
  const communityModules = [
    {
      title: 'Community Events',
      description: 'Stay updated with our latest community events and gatherings. Join us in fostering a vibrant learning community!',
      buttonText: 'View Events',
      imgUrl: event_s, // Add your image URL here
    },
    {
      title: 'Volunteer Opportunities',
      description: 'Discover opportunities to volunteer and contribute to our community. Make a difference!',
      buttonText: 'Explore Opportunities',
      imgUrl: volunteer, // Add your image URL here
    },
    {
      title: 'Community Projects',
      description: 'Explore ongoing community projects and initiatives. Get involved and collaborate with fellow learners!',
      buttonText: 'View Projects',
      imgUrl: c_projects, // Add your image URL here
    },
  ];

  const memberSpotlights = [
    {
      name: 'Ana Johnson',
      role: 'Software Engineer',
      story: 'Joining this community has allowed me to expand my skills and network. I recently completed a project that was featured in a tech conference!',
      imgUrl: member_f,
    },
    {
      name: 'Michael Lee',
      role: 'Student',
      story: 'Through volunteering opportunities here, I have gained valuable experience and made connections that helped me secure an internship.',
      imgUrl: member_m,
    },
    // Add more member spotlights as needed
  ];

  return (
    <div className="community-page">
      <Navbar />
      <div className="community-header">
        <h1>Welcome to Our Community</h1>
        <p>Join our community of passionate learners and educators dedicated to knowledge sharing and growth.</p>
      </div>

      <section className="community-modules">
        {communityModules.map((module, index) => (
          <Section
            key={index}
            title={module.title}
            description={module.description}
            buttonText={module.buttonText}
            imgUrl={module.imgUrl}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>

      {/* Member spotlights section */}
      <div className="community-spotlights">
        <h2>Member Spotlights</h2>
        <div className="community-spotlights-grid">
          {memberSpotlights.map((spotlight, index) => (
            <div className="community-spotlight" key={index}>
              <img src={spotlight.imgUrl} alt={spotlight.name} />
              <h3>{spotlight.name}</h3>
              <h5>{spotlight.role}</h5>
              <p>{spotlight.story}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Discussion forum section */}
      <div className="community-forum">
        <h2>Discussion Forum</h2>
        <div className="forum-content">
          <p>Join the conversation! Ask questions, share insights, and connect with fellow learners and educators.</p>
          <button>Go to Forum</button>
        </div>
      </div>

      {/* Additional sections or modules can be added here */}
      <Footer />
    </div>
  );
};

export default Community;
