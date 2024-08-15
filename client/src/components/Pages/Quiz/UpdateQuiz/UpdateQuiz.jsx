import React, { useState } from 'react'
import customFetch from '../../../utilities/customFetch';
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../CreateQuiz/createQuiz.scss'
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
    const { data } = await customFetch(`/classes/${params?.classId}`);
    return { classObj: data.class, quiz: data.quiz };
}

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const UpdateQuiz = () => {
    const { classObj, quiz } = useLoaderData()
    const [title, setTitle] = useState(quiz.title);
    const [description, setDescription] = useState(quiz.description);
    const [questions, setQuestions] = useState(quiz.questions);
    const [startDate, setStartDate] = useState(formatDate(quiz?.startDate));
    const [endDate, setEndDate] = useState(formatDate(quiz?.endDate));
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            questionText: '', options: [
                { text: '', isCorrect: true },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ], correctAnswersCount: 1
        }]);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionCorrectChange = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].isCorrect = !newQuestions[qIndex].options[oIndex].isCorrect;
        newQuestions[qIndex].correctAnswersCount = newQuestions[qIndex].options.filter(option => option.isCorrect).length;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await customFetch.patch('/quizzes/' + quiz._id, { title, description, questions, startDate, endDate });
            toast.success('Successfully updated quiz');
            return navigate(`/dashboard/classes/${classObj._id}`);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <div className='container'>
            <h2>Update  Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='form-row'>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='form-row'>
                    <label>Start Date</label>
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className='form-row'>
                    <label>End Date</label>
                    <input type="datetime-local" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="single-question-container">
                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className='single-question'>
                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                placeholder="Question text"
                                required
                                className='single-question-text'
                            />
                            {question.options.map((option, oIndex) => (
                                <div key={oIndex} className='option'>
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        placeholder="Option text"
                                        required
                                    />
                                    <input
                                        type="checkbox"
                                        checked={option.isCorrect}
                                        onChange={() => handleOptionCorrectChange(qIndex, oIndex)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <button type="button" className='glow-on-hover' onClick={handleAddQuestion}>Add Question</button>
                    <button type="submit" className='glow-on-hover' >Update Quiz</button>
                </div>
            </form>
        </div>
    );
}
export default UpdateQuiz;