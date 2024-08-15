import React, { useState } from 'react';
import './Profile.scss';
import { Form, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../../utilities/customFetch';
import { getBadge } from '../../utilities/getBadge';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    await axios.patch(
      'http://localhost:4000/api/v1/users/update-user',
      formData,
      { withCredentials: true }
    );
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const ProfilePage = () => {
  const { user } = useOutletContext();
  const [onboardingRequired, setOnboardingRequired] = useState(true);
  const [uniqueKey, setUniqueKey] = useState('');

  const badgeSrc = getBadge(user.level);

  const handleChangeOnboardingRequired = () => {
    setOnboardingRequired(!onboardingRequired);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(user.uniqueKeyForStudent)
      .then(() => {
        toast.success('Unique key copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy unique key');
      });
  };

  const handleAddKid = async (req, res) => {
    try {
      if (!uniqueKey) {
        toast.error('Unique key is required');
        return;
      }
      await customFetch.post('/users/add-kid', {
        uniqueKeyForStudent: uniqueKey,
      });
      setUniqueKey('');
      toast.success('Kid added successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const { firstName, lastName, email, uniqueKeyForStudent, level, experience } =
    user;

  return (
    <main className="main-content">
      <div className="row">
        <div className="profile-page">
          <div className="profile-details">
            <div className="profile-section-left">
              <Form method="post" encType="multipart/form-data">
                <div className="profile-section">
                  <div className="image">
                    <h2>Profile Image</h2>
                    <img
                      src={`http://localhost:4000/${user.avatar}`}
                      alt="Profile"
                      className="profile-image-large"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="upload-input"
                      name="avatar"
                    />
                  </div>

                </div>

                <div className="profile-section">
                  <h2>Employee Details</h2>
                  <div className="employee-detail">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      defaultValue={firstName}
                    />
                  </div>
                  <div className="employee-detail">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      defaultValue={lastName}
                    />
                  </div>
                  <div className="employee-detail">
                    <label>Email Address</label>
                    <input type="email" name="email" defaultValue={email} />
                  </div>
                  <div className="employee-detail">
                    <label>Password</label>
                    <input type="password" name="password" defaultValue={''} />
                  </div>

                  <div className="profile-actions">
                    <button type="submit" className="glow-on-hover">
                      Save Changes
                    </button>
                  </div>
                </div>
              </Form>
            </div>

            <div className="profile-section-right">
              <div className="profile-section">
                <h2>Role</h2>
                <select className="role-select" >
                  <option defaultValue="employee">{user?.role}</option>
                </select>
              </div>
              <div className="profile-section">


              </div>
              {user.role === 'student' && (
                <div className="profile-section">
                  <h2>Unique key</h2>
                  <input
                    type="text"
                    className="uniqueKey"
                    disabled
                    placeholder="Unique key"
                    defaultValue={uniqueKeyForStudent}
                  />
                  <button className="glow-on-hover" onClick={copyToClipboard}>
                    copy
                  </button>
                </div>
              )}
              {user.role === 'parent' && (
                <div className="profile-section">
                  <h2>Add Kid</h2>
                  <input
                    type="text"
                    className="uniqueKey"
                    placeholder="Unique key"
                    onChange={(e) => setUniqueKey(e.target.value)}
                  />
                  <button className="glow-on-hover" onClick={handleAddKid}>
                    add kid
                  </button>
                </div>
              )}
              <div className="profile-section">
                <h2>Level & Experience</h2>
                <p>Level: {user.level}</p>
                <p>Experience: {user.experience} XP</p>
                <img src={badgeSrc} alt="Badge" className="badge-image" />
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${user.experience % 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="onboarding">
            <h2>ONBOARDING</h2>
            <div className="start-date">
              <label htmlFor="start-date">Starts on</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                defaultValue="2022-05-21"
              />
            </div>

            <div className="onboarding-required">
              <label className="toggle">
                <input
                  className="toggle-checkbox"
                  type="checkbox"
                  checked={onboardingRequired}
                  onChange={handleChangeOnboardingRequired}
                />
                <div className="toggle-switch"></div>
                <span className="toggle-label">Onboarding required</span>
              </label>
            </div>
            <div className="current-status">
              <span className="status-label">Current Status</span>
              <div className="status">
                <span className="status-text">Onboarding</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '35%' }}></div>
                </div>
                <span className="progress-percent">35%</span>
              </div>
            </div>
            <a href="#" className="view-answers">
              View Answers
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
