import React from "react";

const ProfilePicture = ({ imageUrl }) => {
  return (
    <div className="profile-picture-container">
      <img src={imageUrl} alt="Profile" className="profile-picture" />
    </div>
  );
};

export default ProfilePicture;
