import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizzesList.scss';
import AnswerQuiz from '../AnswerQuiz/AnswerQuiz';
import EditQuiz from '../EditQuiz/EditQuiz';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../../atoms/ConfirmationModal/ConfirmationModal'; 

const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/quizzes');
        setQuizzes(response.data.quizes);
      } catch (error) {
        console.error('There was an error fetching the quizzes!', error);
      }
    };
    
    const fetchUserRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          setUserRole(decodedToken.role);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };
    
    fetchQuizzes();
    fetchUserRole();
  }, []);

  const handleEditQuiz = (quiz) => {
    if (!isEditing) {
      setSelectedQuiz(quiz);
      setIsEditing(true);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    setShowModal(true);
    setDeleteQuizId(quizId);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/quizzes/${deleteQuizId}`,
        {
          withCredentials: true,
        }
      );
      setQuizzes(quizzes.filter((quiz) => quiz._id !== deleteQuizId));
      console.log('Quiz deleted:', response.data);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    } finally {
      setShowModal(false);
      setDeleteQuizId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteQuizId(null);
  };

  const handleUpdateQuiz = async (updatedQuiz) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`http://localhost:4000/api/v1/quizzes/${updatedQuiz._id}`, updatedQuiz, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(quizzes.map((quiz) => (quiz._id === updatedQuiz._id ? response.data.updatedQuiz : quiz)));
      setIsEditing(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error('There was an error updating the quiz!', error);
    }
  };

  return (
    <div className="quizzes-list">
      <h2>Quizzes</h2>
      {selectedQuiz && !isEditing ? (
        <AnswerQuiz quiz={selectedQuiz} />
      ) : selectedQuiz && isEditing ? (
        <EditQuiz quiz={selectedQuiz} onUpdateQuiz={handleUpdateQuiz} />
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="quiz-item">
              <div className="quiz-info">
                <p><strong>{quiz.title}</strong></p>
                <p>{quiz.description}</p>
                <button onClick={() => setSelectedQuiz(quiz)}>Answer Quiz</button>
              </div>
              <div className="question-actions">
                <button className="icon-edit" onClick={() => handleEditQuiz(quiz)}><FaEdit /> Edit</button>
                <button className="icon-delete" onClick={() => handleDeleteQuiz(quiz._id)}><FaTrashAlt /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this quiz?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default QuizzesList;