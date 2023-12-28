import React, { useState } from "react";

const AvatarPicker = ({ selectedAvatar, onSelectAvatar }) => {
  const avatarOptions = [
    "/dogAvatar.png",
  ];

  const avatarSize = "50px";

  const [selectedOption, setSelectedOption] = useState(selectedAvatar);

  const handleAvatarClick = (avatar) => {
    setSelectedOption(avatar);
    onSelectAvatar(avatar);
  };

  return (
    <div className="avatar-picker">
      <h6>Select Your Avatar</h6>
      <div className="avatar-list">
        {avatarOptions.map((avatar, index) => (
          <div
            key={index}
            className="avatar-option"
            style={{
              border:
                selectedOption === avatar
                  ? "2px solid #FCC44C"
                  : "2px solid transparent",
              padding: "1px",
              borderRadius: "10px",
            }}
          >
            <img
              className="avatar-img"
              src={avatar}
              alt={`Avatar ${index}`}
              style={{
                maxWidth: avatarSize,
                maxHeight: avatarSize,
                cursor: "pointer",
              }}
              onClick={() => handleAvatarClick(avatar)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;