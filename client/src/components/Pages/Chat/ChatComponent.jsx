import React, { useState, useEffect, useRef } from 'react';
import './Chat.scss';
import Message from '../../atoms/Message/Message';
import customFetch from '../../utilities/customFetch';
import Conversation from './Conversation/Conversation';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';

const ChatComponent = ({ userId, socket, avatar }) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState(null);
    const [filterConversations, setFilteredConversation] = useState([]);
    const scrollRef = useRef();
    const fileInputRef = useRef();

    useEffect(() => {
        const handleGetMessage = async (data) => {
            if (currentChat && currentChat._id === data.conversationId &&
                currentChat.members.findIndex(m => m._id === userId) !== -1) {
                setMessages(prevMessages => [...prevMessages, {
                    senderId: data.senderId,
                    text: data.text,
                    image: data.image,
                    createdAt: Date.now(),
                }]);
                if (data?.image) {
                    const { data } = await customFetch(`/messages/${currentChat?._id}`);
                    setMessages(data?.messages || []);
                }
            }

        };

        socket?.on("getMessage", handleGetMessage);

        return () => {
            socket?.off("getMessage", handleGetMessage);
        };
    }, [currentChat]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await customFetch.get("/conversations");
                setConversations(res.data.conversations);
                setFilteredConversation(res.data.conversations);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [userId]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data } = await customFetch(`/messages/${currentChat?._id}`);
                setMessages(data?.messages || []);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        const markReadMessages = async () => {
            try {
                await customFetch.put(`/messages/${currentChat?._id}/mark-messages`);
            } catch (error) {
                console.error("Failed to mark messages as read:", error);
            }
        };

        if (currentChat) {
            getMessages();
            markReadMessages();

            setFilteredConversation(prevConversations => {
                const updatedConversations = [...prevConversations];
                const index = updatedConversations.findIndex(c => c._id === currentChat._id);
                if (index !== -1) {
                    updatedConversations[index] = {
                        ...currentChat,
                        lastMessage: {
                            ...currentChat.lastMessage,
                            readBy: [...(currentChat.lastMessage?.readBy || []), userId]
                        }
                    };
                    return updatedConversations;
                }
                return prevConversations;
            });
        }
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage && !image) {
            return;
        }
        const formData = new FormData();
        formData.append('senderId', userId);
        formData.append('text', newMessage);
        formData.append('conversationId', currentChat._id);
        if (image) formData.append('image', image);

        socket?.emit("sendMessage", {
            senderId: { _id: userId, avatar },
            text: newMessage,
            image,
            conversationId: currentChat._id,
        });

        try {
            const res = await customFetch.post("/messages", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessages([...messages, res.data.message]);
            setNewMessage('');
            setImage(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery) {
            let newConversation = [];
            filterConversations.forEach(c => {
                if (c?.groupName && c.groupName.includes(searchQuery)) {
                    newConversation.push(c);
                } else if (!c?.groupName) {
                    const otherMembers = c.members.filter(m => m._id !== userId);
                    if (otherMembers?.[0]?.firstName?.toLowerCase().includes(searchQuery) ||
                        otherMembers?.[0]?.lastName?.toLowerCase().includes(searchQuery))
                        newConversation.push(c);
                }
            })
            setFilteredConversation(newConversation)
        } else {
            setFilteredConversation(conversations);
        }
    }

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // 2MB limit
            toast.error('Image size should be less than 2MB');
            return;
        }
        console.log(file);

        setImage(file);
    };

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="searchBtn">
                            <input placeholder="Search for conversations" onChange={handleSearchChange} className="chatMenuInput" />
                            <Link to={'conversation/create'} className='glow-on-hover'>Create</Link>
                        </div>
                        {filterConversations.map((c) => (
                            <div key={c._id} className={`${c._id === currentChat?._id ? 'selected' : ''}`} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={userId} setConversations={setFilteredConversation} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop" ref={scrollRef}>
                                    {messages.length === 0 ? <h2>Send a message</h2> : (
                                        messages.map((m, index) => (
                                            <div key={index}>
                                                <Message {...m} own={m.senderId?._id === userId} />
                                            </div>
                                        )))
                                    }
                                </div>
                                <div className="chatBoxBottom">
                                    <button
                                        type="button"
                                        className="fileInputButton"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <FaPlus />
                                        {image && <span>{image?.name}</span>}
                                    </button>
                                    <input
                                        className="fileInput"
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                        onKeyDown={handleKeyDown}
                                    ></textarea>
                                    <button className='glow-on-hover' onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;
