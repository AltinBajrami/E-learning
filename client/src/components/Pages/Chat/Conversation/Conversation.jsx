import React from 'react'
import './conversation.scss'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md'
import customFetch from '../../../utilities/customFetch';

const Conversation = ({ conversation, currentUser, setConversations }) => {

    let name = conversation?.groupName, lastName, photo = conversation.photo;

    if (conversation.members.length === 2) {
        const otherMember = conversation.members.find(member => member._id !== currentUser);
        if (!conversation.groupName) {
            name = otherMember?.firstName;
            lastName = otherMember?.lastName;
        }
        if (photo === '/uploads/chatGroup/groupImage.jpg') photo = otherMember?.avatar
    }


    const handleClick = async () => {
        try {
            await customFetch.delete(`/conversations/${conversation._id}`)
            setConversations((oldConversations) =>
                oldConversations.filter(c => c._id !== conversation._id)
            );
            toast.success("Conversation deleted successfully")
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    }

    const lastMessage = conversation?.lastMessage;
    return (
        <div className='conversation'>
            <img src={`http://localhost:4000/${photo}`} alt="" className="img" />
            <div className="info">
                <span >{name} {lastName}</span>
                {lastMessage && !lastMessage?.readBy.includes(currentUser) &&
                    <p>You have 1 or more messages</p>
                }
            </div>

            <div className="actions">
                {conversation.admin === currentUser &&
                    <Link to={'conversation/edit/' + conversation?._id} ><MdEdit /></Link>}
                <button onClick={handleClick}><MdDelete /></button>
            </div>
        </div>
    )
}

export default Conversation