import React from 'react';
import './Resources.scss';

const Resources = () => {
    const resources = [
        {
            title: 'PDF Guides',
            description: 'Access comprehensive PDF guides on various subjects to enhance your learning experience.',
            content: 'Our PDF guides are meticulously crafted to provide you with in-depth knowledge on specific topics. Each guide is structured to ensure clarity and ease of understanding. You can download and refer to these guides at any time, making them a valuable resource for both revision and reference.'
        },
        {
            title: 'Video Tutorials',
            description: 'Watch engaging video tutorials to grasp complex concepts with ease.',
            content: 'Our video tutorials cover a wide range of subjects and are designed to make learning interactive and enjoyable. Whether you are a visual learner or prefer auditory learning, these videos are tailored to suit your needs.'
        },
        {
            title: 'Interactive Quizzes',
            description: 'Test your knowledge and reinforce learning through interactive quizzes.',
            content: 'Quizzes are a fun way to assess your understanding of the material. Our interactive quizzes provide immediate feedback, helping you identify areas where you need improvement. They are available for all subjects and difficulty levels.'
        },
        {
            title: 'E-books',
            description: 'Explore our collection of e-books to expand your knowledge base.',
            content: 'Our e-books are authored by experts in their respective fields and are a great way to dive deeper into specific topics. The digital format allows you to read them on any device, making it convenient to learn on the go.'
        },
        {
            title: 'Webinars',
            description: 'Join live webinars hosted by industry professionals and subject matter experts.',
            content: 'Our webinars are interactive sessions where you can ask questions and engage in discussions with experts. They cover the latest trends and developments in various fields, providing you with up-to-date information and insights.'
        },
        {
            title: 'Infographics',
            description: 'Visualize information with our detailed and informative infographics.',
            content: 'Infographics are a powerful tool to present data and information in a visually appealing way. Our infographics summarize complex information into easy-to-understand visuals, making it easier to retain and recall important details.'
        }
    ];

    return (
        <div className="resources-page">
            <h1>Resources</h1>
            <p>Welcome to our Resources page! Here, you can find a variety of materials to aid in your learning journey. Explore the different resources we offer below:</p>
            {resources.map((resource, index) => (
                <div key={index} className="resource">
                    <h2>{resource.title}</h2>
                    <p>{resource.description}</p>
                    <div className="resource-content">
                        <p>{resource.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Resources;
