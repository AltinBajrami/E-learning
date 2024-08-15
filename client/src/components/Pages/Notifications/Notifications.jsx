import React, { useEffect, useState } from 'react';
import "../../Pages/Dashboard/Dashboard.scss";
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { format } from 'timeago.js';
import './Notifications.scss';
import { toast } from 'react-toastify';
import customFetch from '../../utilities/customFetch';

const Notifications = () => {
  const { setNotificationsNum, notifications, setNotifications, user } = useOutletContext();
  const [pendingRequest, setPendingRequest] = useState(user?.pendingRequest || []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await customFetch(`/notifications`);
        setNotifications(data.notifications);
        setNotificationsNum(data.notifications.length + user.pendingRequest.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    getNotifications();
  }, [setNotificationsNum, setNotifications]);

  const handleClearAll = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/api/v1/notifications`, { withCredentials: true });
      setNotifications([]);
      setNotificationsNum(0 + pendingRequest.length);
      toast.success("Deleted all notifications")
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/notifications/${id}`, { withCredentials: true });
      setNotifications(prevNotifications => prevNotifications.filter(n => n._id !== id));
      setNotificationsNum(notifications.length - 1 + pendingRequest.length);
      toast.success("Successfully deleted notification")
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error deleting notification");
    }
  };

  const handleAccept = async (id) => {
    try {
      await customFetch.post(`/users/accept-parent-request`, { requestId: id });
      setPendingRequest(pendingRequest.filter((r) => r._id !== id));
      toast.success("Successfully accepted request")
      setNotificationsNum(notifications.length - 1);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error accepting request");
    }
  };
  const handleReject = async (id) => {
    try {
      await customFetch.post(`/users/reject-parent-request`, { requestId: id });
      setPendingRequest(pendingRequest.filter((r) => r._id !== id));
      toast.success(" Rejected request")
      setNotificationsNum(notifications.length - 1);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error rejecting");
    }
  };

  console.log(notifications.length === 0, pendingRequest.length === 0)
  return (
    <section className="tasks-section">
      <div className="tasks-summary">
        <div className="summary-items">
          <h2>Notifications Page</h2>
          {notifications.length > 0 &&
            <button className='clearAllButton' onClick={handleClearAll}>Clear all</button>
          }
        </div>
      </div>

      <div className="notifications">
        {user.role === 'student' && user.pendingRequests.length > 0 && (
          user.pendingRequests.map((request) => {
            if (request.status !== 'pending') return;
            return <article key={request._id} className='notification'>
              <img src={'http://localhost:4000/' + request?.parentId?.avatar} alt="avatar" />
              <div className="info">
                <h4>{request?.parentId?.firstName} {request?.parentId?.lastName}</h4>
                <p>Wants to add you as a kid,if you accept he will see your progress</p>
              </div>
              <div className="btns">
                <button className='acceptButton' onClick={() => handleAccept(request._id)}>accept</button>
                <button className='removeAllButton' onClick={() => handleReject(request._id)}>reject</button>
              </div>
            </article>
          })
        )}
      </div>

      <div className="notifications">
        {(notifications.length === 0 && user.pendingRequests.length === 0) ? (<h2>No New Notification</h2>) : (
          notifications.map((notification, index) =>
          (
            <div key={index} className="notification">
              <img src={'http://localhost:4000/' + notification?.senderId?.avatar} alt="avatar" />
              <div className="info">
                <h4>{notification?.senderId?.firstName} {notification?.senderId?.lastName}</h4>
                {notification?.type === 'group' && <p>Has added you to  {notification?.groupName} group</p>}
                {/* <p>Has sent a {notification?.type} to you</p> */}
              </div>
              <p>{format(notification?.timestamp)}</p>
              <button className='removeAllButton' onClick={() => handleRemove(notification._id)}>remove</button>
            </div>
          )
          )
        )}
      </div>
    </section>
  );
};

export default Notifications;
