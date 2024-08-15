import React, { useState } from 'react';
import axios from 'axios';
import './CreateQuiz.scss';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { 
      questionText: '', 
      options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }], 
      correctAnswersCount: 1,
      type: 'single' 
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/quizzes', {
        title,
        description,
        questions,
      }, { withCredentials: true });
      console.log('Quiz created:', response.data);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="create-quiz">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz Title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quiz Description"
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question">
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'questionText', e.target.value)
              }
            />
            <div>
              <label>Type</label>
              <select
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'type', e.target.value)
                }
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
              </select>
            </div>
            <div className="options">
              {question.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <label>Option {oIndex + 1}</label>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, 'text', e.target.value)
                    }
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateQuiz;