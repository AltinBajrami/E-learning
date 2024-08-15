import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const TopicForm = ({ newTopic, setNewTopic, topicId, isEditing, setIsEditing, setTopics }) => {
    const { id } = useParams();

    const handleAddTopic = async (e) => {
        e.preventDefault();
        if (!newTopic) {
            toast.error('Please enter a topic');
            return;
        }

        try {
            let topics;
            if (isEditing) {
                const { data } = await axios.patch(`http://localhost:4000/api/v1/classes/${id}/topics/${topicId}`, { topic: newTopic },
                    { withCredentials: true });
                topics = data.classObj.topics;
            } else {
                const { data } = await axios.post(`http://localhost:4000/api/v1/classes/${id}/topics`, { topic: newTopic },
                    { withCredentials: true });
                topics = data.classObj.topics;
            }
            setTopics([...topics]);
            setNewTopic('');
            toast.success(`Topic ${isEditing ? 'updated' : 'added'} successfully`);
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error adding topic');
            setIsEditing(false);
            setNewTopic('');
        }
    };

    return (
        <form onSubmit={handleAddTopic} className='formTopic'>
            <label> {isEditing ? 'update' : 'add new'} Topic</label>
            <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="New topic title"
            />
            <button className="glow-on-hover" type="submit"> {isEditing ? 'update' : 'add'} Topic</button>
        </form>
    );
};

export default TopicForm;
