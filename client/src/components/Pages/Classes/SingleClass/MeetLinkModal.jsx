import React, { useState } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../../../utilities/customFetch';
import { useParams } from 'react-router-dom';

const MeetLinkModal = ({ selectedTopic, setShowMeetLinkModal, setTopics }) => {
    const { id } = useParams();
    const [meetLink, setMeetLink] = useState(selectedTopic?.meetLink || '');
    const [meetStartTime, setMeetStartTime] = useState(selectedTopic?.startTime || '');
    const [meetEndTime, setMeetEndTime] = useState(selectedTopic?.endTime || '');

    const handleAddMeetLink = async (e) => {
        e.preventDefault();
        if (!meetLink || !meetStartTime || !meetEndTime) {
            toast.error('Please enter a meet link, start time, and end time');
            return;
        }

        try {
            const { data } = await customFetch.post(`/classes/${id}/topics/${selectedTopic._id}/meetLink`, {
                meetLink,
                startTime: meetStartTime,
                endTime: meetEndTime,
            });
            setTopics(data.classObj.topics);
            toast.success('Meet link added successfully');
            setMeetLink('');
            setShowMeetLinkModal(false);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error updating meet link');
        }
    };

    return (
        <div className="meetLinkModal">
            <form onSubmit={handleAddMeetLink}>
                <h4>Add Meet Link</h4>
                <input
                    type="text"
                    value={meetLink}
                    onChange={(e) => setMeetLink(e.target.value)}
                    placeholder="Meet Link"
                />
                <input
                    type="datetime-local"
                    value={meetStartTime}
                    onChange={(e) => setMeetStartTime(e.target.value)}
                />
                <input
                    type="datetime-local"
                    min={meetStartTime}
                    value={meetEndTime}
                    onChange={(e) => setMeetEndTime(e.target.value)}
                />
                <div className="btns">
                    <button type="submit" className='glow-on-hover'>Add Link</button>
                    <button type="button" className='glow-on-hover' onClick={() => setShowMeetLinkModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default MeetLinkModal;
