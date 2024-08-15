import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../../utilities/customFetch';
import './Certifications.scss';
import Navbar from '../../organisms/Navbar/Navbar';
import Footer from '../../organisms/Footer/Footer';

const Certifications = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    parentName: '',
    teacherName: '',
    uniqueKeyForStudent: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizResponse = await customFetch.get('/certificates');
        setCompletedQuizzes(quizResponse.data.completedQuizzes);

        const userResponse = await customFetch.get('/users/current-user');
        setUserData(userResponse.data.user);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching completed quizzes or user data');
      }
    };

    fetchData();
  }, []);

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGetCertificate = async () => {
    if (!selectedQuiz) {
      toast.error('Please select a quiz to generate a certificate');
      return;
    }

    try {
      const response = await customFetch.post('/certificates/generate', {
        selectedQuiz,
        ...userData,
      });
      console.log('Response:', response.data);
      toast.success('Certificate generated and sent to your email');
    } catch (error) {
      console.error('Error generating/sending certificate:', error);
      toast.error('Error generating/sending certificate');
    }
  };

  return (
    <>
      <Navbar />
      <div className="certifications-container">
        <h2>Claim Your Certificate</h2>
        <div className="completed-quizzes">
          {completedQuizzes.length > 0 ? (
            <>
              <label htmlFor="quiz-select">Select a completed class:</label>
              <select
                id="quiz-select"
                value={selectedQuiz}
                onChange={handleQuizChange}
                className="modern-input"
              >
                <option value="">-- Select a quiz --</option>
                {completedQuizzes.map((quiz) => (
                  <option key={quiz.quizId} value={quiz.quizId}>
                    {quiz.classTitle} - {quiz.quizTitle}
                  </option>
                ))}
              </select>
              <div className="user-details">
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="modern-input"
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="modern-input"
                  />
                </label>
                <label>
                  Parent Name (Optional):
                  <input
                    type="text"
                    name="parentName"
                    value={userData.parentName}
                    onChange={handleInputChange}
                    className="modern-input"
                  />
                </label>
                <label>
                  Unique Key:
                  <input
                    type="text"
                    name="uniqueKeyForStudent"
                    value={userData.uniqueKeyForStudent}
                    onChange={handleInputChange}
                    className="modern-input"
                    readOnly={true}
                  />
                </label>
              </div>
              <button onClick={handleGetCertificate} className="classic-button">
                Get Certificate
              </button>
            </>
          ) : (
            <p>No completed quizzes found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Certifications;
