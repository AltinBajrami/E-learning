import React, { useState } from 'react';
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicForm from './TopicForm.jsx';
import TopicList from './TopicList.jsx';
import MeetLinkModal from './MeetLinkModal';
import QuizSection from './QuizSection.jsx';
import './singleClass.scss'
import customFetch from '../../../utilities/customFetch.js';

export const loader = async ({ params }) => {
    const { data } = await customFetch.get(`/classes/${params.id}`);
    return { classObj: data?.class, quiz: data?.quiz };
};

const SingleClass = () => {
    const { classObj, quiz: quiz1 } = useLoaderData();
    const { user } = useOutletContext();
    const { id } = useParams();

    const [newTopic, setNewTopic] = useState('');
    const [topicId, setTopicId] = useState(null);
    const [topics, setTopics] = useState(classObj.topics || []);
    const [isEditing, setIsEditing] = useState(false);
    const [quiz, setQuiz] = useState(quiz1);

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [showMeetLinkModal, setShowMeetLinkModal] = useState(false);

    const handleDeleteMeetLink = async (topicId) => {
        try {
            const { data } = await customFetch.delete(`/classes/${id}/topics/${topicId}/meetLink`);
            setTopics(data.classObj.topics);
            toast.success('Meet link deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error deleting meet link');
        }
    }

    const handleDeleteClick = async (topicId) => {
        try {
            const { data } = await customFetch.delete(`/classes/${id}/topics/${topicId}`, { withCredentials: true });
            setTopics(data.classObj.topics);
            toast.success('Topic deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error deleting topic');
        }
    }

    const handleDeleteQuiz = async (quizId) => {
        try {
            await customFetch.delete(`/quizzes/${quizId}`);
            toast.success('Quiz deleted successfully');
            setQuiz(null);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error deleting quiz');
        }
    }

    const handleEditMeetLink = (topic) => {
        setSelectedTopic(topic);
        setShowMeetLinkModal(true);
    }


    return (
        <section className='singleClassPage'>
            <div className="singleClassText">
                <div className="headerInfo">
                    <h1>{classObj.title}</h1>
                    <p>{classObj.description}</p>
                </div>

                {(user.role === 'superadmin' || user.role === 'teacher') &&
                    <TopicForm
                        newTopic={newTopic}
                        setNewTopic={setNewTopic}
                        topicId={topicId}
                        setTopicId={setTopicId}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        setTopics={setTopics}
                    />
                }
            </div>

            <TopicList
                topics={topics}
                user={user}
                handleEditClick={(title, topicId) => {
                    setIsEditing(true);
                    setNewTopic(title);
                    setTopicId(topicId)
                }}
                handleDeleteClick={handleDeleteClick}
                handleEditMeetLink={handleEditMeetLink}
                handleDeleteMeetLink={handleDeleteMeetLink}
                selectedTopic={selectedTopic}
                setShowMeetLinkModal={setShowMeetLinkModal}
                setTopics={setTopics}
                showMeetLinkModal={showMeetLinkModal}
            />



            <QuizSection
                quiz={quiz}
                setQuiz={setQuiz}
                user={user}
                classObj={classObj}
                handleDeleteQuiz={handleDeleteQuiz}
            />
        </section>
    );
};

export default SingleClass;
