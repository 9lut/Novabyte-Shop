import React from 'react';
import Navbar from '../../components/novaNavbar';
import { userData } from '../../helpers';
import './Profile.css';

export const Profile = () => {
  const { name , username, email} = userData();

  return (
    <div>
      <Navbar />
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Name :</span>
            <span className="detail-value">{name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Username :</span>
            <span className="detail-value">{username}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email :</span>
            <span className="detail-value">{email}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
