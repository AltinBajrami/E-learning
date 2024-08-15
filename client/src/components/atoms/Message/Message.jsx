import React from 'react'
import { format } from 'timeago.js'
import './message.scss'
const Message = ({ own, senderId, text, createdAt, image }) => {
    const avatar = senderId?.avatar;

    return (
        <div className={`${own ? ' message own' : 'message'}`}>
            <div className="messageTop">
                <img src={`http://localhost:4000/${avatar}`} alt="" />
                <div className="text">
                    <span>{senderId?.firstName} {senderId?.lastName}</span>
                    <div className='messageText'>
                        {image && <img src={`http://localhost:4000/${image}`} alt="image" />}
                        <p> {text && text}</p>
                    </div>
                </div>
            </div>
            <div className="messageBottom">
                {format(createdAt)}
            </div>
        </div>
    )
}

export default Message