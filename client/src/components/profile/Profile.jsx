import React from 'react';
import './Profile.css';

const ProfileCard = (props) => {

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={props.imgsrc} alt="user image" />
        </div>
        <h2 className="profile-name">{props.name}</h2>
      </div>
      
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Age</span>
          <span className="detail-value">{props.age}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Blood Type</span>
          <span className="detail-value">{props.blood}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">City</span>
          <span className="detail-value">{props.city}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">State</span>
          <span className="detail-value">{props.state}</span>
        </div>
      </div>
      
      <button className="edit-button">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;