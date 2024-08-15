import React, { useState } from 'react';
import './EditQuiz.scss';
import axios from 'axios';
const EditQuiz = ({ quiz, onUpdateQuiz }) => {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [questions, setQuestions] = useState(quiz.questions);

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [key]: value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = { ...updatedQuestions[qIndex].options[oIndex], [key]: value };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedQuiz = {
      ...quiz,
      title,
      description,
      questions,
    };
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/quizzes/${quiz._id}`,
        updatedQuiz,
        {
          withCredentials: true,
        }
      );
      
      console.log('Quiz updated:', response.data);
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="edit-quiz">
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label>Question</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>Option</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)}
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Update Quiz</button>
      </form>
    </div>
  );
};

export default EditQuiz;