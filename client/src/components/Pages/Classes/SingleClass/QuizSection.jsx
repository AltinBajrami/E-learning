import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import QuizInfo from '../../../atoms/QuizInfo/QuizInfo';

const QuizSection = ({ quiz, setQuiz, handleDeleteQuiz, user, classObj }) => {
    const now = new Date();
    const startDate = new Date(quiz?.startDate);
    const endDate = new Date(quiz?.endDate);

    return (
        <div className="quiz">
            <h2>Quiz</h2>
            {quiz ? (
                <div className='quiz-info'>
                    <p>Title: <span>{quiz.title}</span></p>
                    <p>Desc: <span>{quiz.description}</span></p>
                    <QuizInfo startDate={startDate} endDate={endDate} />
                    <div className='actions'>
                        {user.role === 'student' && (startDate <= now && now <= endDate) && <>
                            <Link to={`/dashboard/quiz/${quiz._id}`} className="glow-on-hover">Start Quiz</Link>
                            <Link to={`/certifications`} className="glow-on-hover">get your certificate</Link>
                        </>
                        }
                        {user.role === 'teacher' && <>
                            <Link to={`/dashboard/edit-quiz/${classObj._id}/${quiz._id}`} className="glow-on-hover">Edit Quiz</Link>
                            <button className='glow-on-hover' onClick={() => handleDeleteQuiz(quiz._id)}>Delete Quiz</button>
                        </>
                        }
                    </div>
                </div>
            ) : (
                <>
                    <p>This class has no quiz yet.</p>
                    {user.role === 'teacher' &&
                        <Link to={`/dashboard/create-quiz/${classObj._id}`} className="glow-on-hover createBtn">Create</Link>
                    }
                </>
            )}
        </div>
    );
};

export default QuizSection;
