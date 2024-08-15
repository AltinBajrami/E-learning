import React, { useState } from 'react'
import customFetch from '../../../utilities/customFetch';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import './createQuiz.scss'
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
    const { data } = await customFetch(`/classes/${params?.classId}`);
    if (data?.quiz) {
        toast.error('Quiz already created you can edit it')
        return redirect(`/dashboard/classes`);
    }
    return { classObj: data.class };
}

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [questions, setQuestions] = useState([{
        questionText: '', options: [
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
        ], correctAnswersCount: 1
    }]);
    const { classObj } = useLoaderData()
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
            await customFetch.post('/quizzes', { title, description, questions, classId: classObj._id, startDate, endDate });
            toast.success('Successfully created quiz');
            return navigate(`/dashboard/classes/${classObj._id}`);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <div className='container'>
            <h2>Create Quiz</h2>
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
                    <input type="datetime-local" value={startDate} required onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className='form-row'>
                    <label>End Date</label>
                    <input type="datetime-local" value={endDate} min={startDate} required onChange={(e) => setEndDate(e.target.value)} />
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
                    <button type="submit" className='glow-on-hover' >Create Quiz</button>
                </div>
            </form>
        </div>
    );
}
export default CreateQuiz;