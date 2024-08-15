import React, { useState } from 'react';
import axios from 'axios';
import './AnswerQuiz.scss';
import  Cookies  from 'js-cookie';
const AnswerQuiz = ({ quiz }) => {
  const [answers, setAnswers] = useState(quiz.questions.map(() => ''));
  const [statusMessage, setStatusMessage] = useState(null);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
       const response = await axios.post(
        `http://localhost:4000/api/v1/quizzes/${quiz._id}/answers`,
        {
          answers,
        },{
          withCredentials: true, 
        }
      );      
      setStatusMessage('Answers submitted successfully!');
      console.log('Answers submitted:', response.data);
    } catch (error) {
      setStatusMessage('Error submitting answers. Please try again.');
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="answer-quiz">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="question">
            <p>{question.questionText}</p>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={oIndex}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleAnswerChange(qIndex, oIndex)}
                />
                <label>{option.text}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default AnswerQuiz;