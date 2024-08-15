import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { format } from 'timeago.js';
import MeetLinkModal from './MeetLinkModal';

const TopicList = ({ topics, user, handleEditClick, handleDeleteClick, handleEditMeetLink, handleDeleteMeetLink, selectedTopic
    , setShowMeetLinkModal, setTopics, showMeetLinkModal
}) => {
    return (
        <div>
            {topics.map(topic => (
                <div key={topic._id} className="topic">
                    <div className="info">
                        <h2>{topic.title}</h2>
                        {user.role === 'teacher' && (
                            <div className="actions">
                                <button onClick={() => handleEditClick(topic.title, topic._id)}><FaEdit /></button>
                                <button className='deleteBtn' onClick={() => handleDeleteClick(topic._id)}><MdDelete /></button>
                                <button className='editBtn' onClick={() => handleEditMeetLink(topic)}>
                                    {topic?.meetLink ? 'Edit Link' : 'Add Link'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        {topic?.meetLink && <div className='meetLink'>
                            <p> Link: <a href={topic.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} >{topic.meetLink}</a>
                                <button className='deleteBtn' onClick={() => handleDeleteMeetLink(topic._id)}>
                                    <MdDelete /></button>
                            </p>
                            <p>Starts Time: {format(topic.startTime)}</p>
                            <p>Ends Time {format(topic.endTime)}</p>
                        </div>}
                    </div>
                    {showMeetLinkModal && topic._id === selectedTopic._id && (
                        <MeetLinkModal
                            selectedTopic={selectedTopic}
                            setShowMeetLinkModal={setShowMeetLinkModal}
                            setTopics={setTopics}

                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default TopicList;
