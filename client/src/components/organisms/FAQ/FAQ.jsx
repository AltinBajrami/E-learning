
import React, { useState } from 'react';
import './FAQ.scss';
import book from '../../../assets/images/book-ai.png';
import star from '../../../assets/images/shinebright.png';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    { question: 'Is the free trial available?', answer: 'Yes, you can try to us for free for 30 days. If you want we\'ll provide you with a free 30-minute onboarding call to get  you up and running. Book a call. ' },
    { question: 'How do I track my order?', answer: 'You can track your order using the tracking number sent to your email.' },
    { question: 'Can I purchase items again?', answer: 'Yes, you can repurchase items from your order history.' },
    { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards, PayPal, and Apple Pay.' },
    { question: 'How do I contact customer service?', answer: 'You can contact us via the contact form on our website.' },
    { question: 'Where are you located?', answer: 'We are located at 123 React Street, JS City.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries around the world.' },
    { question: 'How do I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link.' },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <img src={star} alt={star} className='star-img'/>
      <h1>Frequently asked questions</h1>
      <p>These are the most commonly asked questions about Untitled UI and billing. Can't find what you're looking for? <u>Chat to our friendly team!</u></p>
      <ul className="faq-list">
        {questions.map((item, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <img src={book} alt={book} className='faq-image'/>
              <span>{item.question}</span>
              <span className={`arrow ${activeIndex === index ? '' : 'open'}`}></span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
