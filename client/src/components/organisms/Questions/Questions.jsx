import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Sidebar from '../Sidebar/Sidebar';
import "../../../styles/main.scss";
import "./Questions.scss"
import search_icon from '../../../assets/images/search_icon.png';
import x_delete from "../../../assets/images/x_delete.png";
import avatar from "../../../assets/images/avatar.png";
import notification from '../../../assets/images/notification.png';
import dashboard from '../../../assets/images/dashboard.png';
import task_list from '../../../assets/images/task_list.png';
import projects from '../../../assets/images/projects.png';
import services from '../../../assets/images/services.png';
import chats from '../../../assets/images/chats.png';
import icon_questions from '../../../assets/images/questions.png';
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaCopy } from 'react-icons/fa';
import CreateQuiz from '../Quiz/CreateQuestion/CreateQuiz';
import QuizzesList from '../Quiz/QuizzesList/QuizzesList';
import { useAuth } from '../../../contexts/AuthContext';

const pages = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Projects', path: '/projects' },
  { name: 'Task list', path: '/task-list' },
  { name: 'Services', path: '/services' },
  { name: 'Notifications', path: '/notifications' },
  { name: 'Chat', path: '/chat' },
  { name: 'Questions', path: '/questions' }
];

const Questions = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showQuizzesList, setShowQuizzesList] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      localStorage.removeItem('authToken');
      navigate('/sign-in');
    }
  };

  const toggleCreateQuiz = () => {
    setShowCreateQuiz(!showCreateQuiz);
  };

  const toggleQuizzesList = () => {
    setShowQuizzesList(!showQuizzesList);
  };

  const [questions, setQuestions] = useState([
    'How would you rate your overall experience on our app?',
    'What device do you usually use to access the application or website?',
    'Was it easy to find what you were looking for on the application or website?',
    'Did you find the application or website visually appealing?',
  ]);

  const handleDelete = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCopy = () => {
    const copyText = document.getElementById('survey-link');
    copyText.select();
    document.execCommand('copy');
    alert('Copied to clipboard: ' + copyText.value);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 3) {
      const results = pages.filter((page) =>
        page.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results.map((result) => result.name));
    } else {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleResultClick = (pageName) => {
    const page = pages.find((page) => page.name === pageName);
    if (page) {
      navigate(page.path);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  return (
    <div className="app">
      {/* <Sidebar /> */}
      <main className="main-content">
        <section className="tasks-section">
          <div className="questions-summary">
            <div className="summary-items">
              <h2>Questions</h2>
              <div className="questions-container">
                <div className="quiz-button">
                {currentUser?.role === 'teacher' && (
                    <>
                      <button onClick={toggleCreateQuiz}>
                        {showCreateQuiz ? 'Hide Create Quiz' : 'Show Create Quiz'}
                      </button>
                      <button onClick={toggleQuizzesList}>
                        {showQuizzesList ? 'Hide Quizzes List' : 'Show Quizzes List'}
                      </button>
                    </>
                  )}
                    {showCreateQuiz && <CreateQuiz />}
                  {showQuizzesList && <QuizzesList />}
              </div>
              <div className="questions-header">
                <span className="status active">Active</span>
                <h1>News feed user experience survey</h1>
                <p>
                  This survey is to help the e-learning students to understand how to use qusestion survey
                </p>
                <div className="questions-actions">
                  <button className="disable-survey">Disable survey</button>
                  <div className="survey-link-container">
                    <input
                      type="text"
                      id="survey-link"
                      readOnly
                      value="starlabs-internship"
                      className="survey-link"
                    />
            <button className="copy-btn" onClick={handleCopy}>
              <FaCopy />
            </button>
          </div>
        </div>
      </div>
      <div className="questions-body">
        <div className="questions-tabs">
          <button className="tab">Overview</button>
          <button className="tab">Responses (38)</button>
          <button className="tab active">Questions (8)</button>
        </div>
        <div className="survey-questions">
          {questions.map((question, index) => (
            <div className="question-item" key={index}>
              <div className="question-text">
                {index + 1}. {question}
                <span className="question-type">Single choice</span>
              </div>
              <div className="question-actions">
                <button className="edit-btn">
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Questions;