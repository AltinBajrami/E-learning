import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customFetch from '../../../utilities/customFetch';
import './attemptQuiz.scss';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';

const AttemptQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const now = new Date();
    const startDate = new Date(quiz?.startDate);
    const endDate = new Date(quiz?.endDate);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const { data } = await customFetch(`/quizzes/${id}`);
                setQuiz(data.quiz);
                const initialAnswers = {};
                data.quiz.questions.forEach((question, qIndex) => {
                    initialAnswers[qIndex] = {};
                    question.options.forEach((option, oIndex) => {
                        initialAnswers[qIndex][oIndex] = false;
                    });
                });
                setAnswers(initialAnswers);
            } catch (error) {
                toast.error('Failed to load quiz');
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionChange = (oIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestionIndex]: {
                ...prevAnswers[currentQuestionIndex],
                [oIndex]: !prevAnswers[currentQuestionIndex]?.[oIndex]
            },
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (now > endDate) {
                toast.error('Quiz has ended. You cannot submit it anymore.');
                return;
            }
            await customFetch.post(`/quizzes/${id}/answers`, { answers });
            toast.success('Quiz submitted successfully');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    if (!quiz) {
        return <div className='loading'>Loading...</div>;
    }


    if (startDate > now) {
        return <h2 className='quiz-title'>Quiz starts  {format(startDate)}</h2>
    }
    if (now > endDate) {
        return <h2 className='quiz-title'>Quiz has ended {format(endDate)}.</h2>
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className='quiz-container'>
            <div className="progress">
                <div className="info">
                    <label >{currentQuestionIndex + 1} / {quiz?.questions.length}</label>
                    <p className="time"> {format(quiz.endDate)}</p>
                </div>
                <input type="range" disabled min={0} value={currentQuestionIndex + 1} max={quiz?.questions.length} />
            </div>
            <h2 className='quiz-title'>{quiz.title}</h2>
            <form onSubmit={handleSubmit} className='quiz-form'>
                <div className='question-container'>
                    <h3 className='question-text'>{currentQuestion.questionText}</h3>
                    {currentQuestion.options.map((option, oIndex) => (
                        <div key={oIndex} className='option'>
                            <input
                                type="checkbox"
                                id={`option-${oIndex}`}
                                checked={answers[currentQuestionIndex]?.[oIndex] || false}
                                onChange={() => handleOptionChange(oIndex)}
                                className='option-checkbox'
                            />
                            <label htmlFor={`option-${oIndex}`} className='option-label'>{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    {currentQuestionIndex > 0 && (
                        <button type="button" onClick={handlePreviousQuestion} className='glow-on-hover'>
                            Previous
                        </button>
                    )}
                    {currentQuestionIndex < quiz.questions.length - 1 && <button type="button"
                        onClick={handleNextQuestion} className='glow-on-hover'> Next</button>}

                    {currentQuestionIndex === quiz.questions.length - 1 && <button type="submit"
                        className='glow-on-hover'>Submit Quiz</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AttemptQuiz;
