import React from "react";
import CardList from "../../molecules/CardList/CardList";
import { useNavigate } from 'react-router-dom';
import onlineCoursesImage from '../../../assets/images/online.png';
import quizImage from '../../../assets/images/quizz.jpg';
import parentDashboardImage from '../../../assets/images/parents.png';
import forum from '../../../assets/images/forum.png';
import resources from '../../../assets/images/resources.png';
import './ServicesSection.scss';

const ServicesSection = () => {
    const navigate = useNavigate();
    const services = [
        {title: 'Online Courses', description: 'Discover a world of knowledge and opportunity with our comprehensive online courses', imageSrc: onlineCoursesImage, link: '/courses'},
        {title: 'Quizzes', description: 'Engage with our interactive quizzes to test your knowledge and reinforce your learning', imageSrc: quizImage, link: '/quizzes'},
        {title: 'Parents Dashboard', description: 'Our Parents Dashboard offers a comprehensive overview of your child\'s learning journey', imageSrc: parentDashboardImage, link: '/parents-dashboard'},
        {title: 'Community Forum', description: 'Join discussions and interact with the community', imageSrc: forum, link: '/community-forum'},
        {title: 'Resources', description: 'Access a wide range of resources to enhance your learning experience', imageSrc: resources, link: '/resources'}
    ];

    const handleCardClick = (link) => {
        navigate(link);
    };

    return (
        <section className="services-section">
            <h2 className="services-header">Services</h2>
            <p className="services-description">
                Our team is a dynamic group of individuals united by a shared passion and commitment to excellence. With diverse backgrounds and skill sets, we thrive on collaboration and innovation, leveraging our collective strengths to tackle challenges and achieve our goals.
            </p>
            <CardList services={services} onCardClick={handleCardClick}/>
        </section>
    );
};

export default ServicesSection;
