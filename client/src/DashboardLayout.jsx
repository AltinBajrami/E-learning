import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Outlet, useLoaderData, redirect } from 'react-router-dom'
import Sidebar from './components/organisms/Sidebar/Sidebar';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import io from 'socket.io-client'
import './styles/main.scss'
import { toast } from 'react-toastify';

export const loader = async () => {
    try {
        const { data } = await axios('http://localhost:4000/api/v1/users/current-user',
            {
                withCredentials: true,
            });
        const { data: { notifications } } = await axios.get(`http://localhost:4000/api/v1/notifications`, { withCredentials: true });
        return { user: data.user, notificationsData: notifications };
    } catch (error) {
        return redirect('/')
    }
}

const DashboardLayout = () => {
    const { user, notificationsData } = useLoaderData();
    const [notificationsNum, setNotificationsNum] = useState(notificationsData?.length);
    const [notifications, setNotifications] = useState(notificationsData);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketConnection = io('http://localhost:4000');
        setSocket(socketConnection);

        // Emit joinChat event when socket connects
        socketConnection.emit('joinChat', { userId: user?.userId });

        socketConnection.on('getNotification', (data) => {
            const { receiverId, groupName, senderId, type } = data;
            setNotifications(prevNotifications => [
                { receiverId, senderId, type, groupName },
                ...prevNotifications,
            ]);
            setNotificationsNum(prev => prev + 1);
            toast.info('You have a new notification')
        });
    }, []);

    if (!socket) {
        return <h2>loading</h2>
    }

    return (
        <div className='dashboardLayout'>
            <Sidebar notificationsNum={notificationsNum} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />
            <div className="dashboardContent">
                <SearchBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <Outlet context={{ user, setNotificationsNum, socket, notifications, setNotifications }} />
            </div>
        </div>
    )
}


export default DashboardLayout