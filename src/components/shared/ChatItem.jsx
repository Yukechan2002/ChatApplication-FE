import React, { memo } from "react";
import AvatarCard from "./AvatarCard";
import "./ChatItem.css";
import { Link } from "../styles/StyledComponents";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeletedChat,
}) => {
  const onContextMenuHandler = (e) => {
    e.preventDefault(); // Prevent the default context menu
    handleDeletedChat(e, _id, groupChat); // Call the custom context menu handler
  };

  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={onContextMenuHandler} // Use the custom context menu handler
    >
      <div className={`chat-item ${sameSender ? "same-sender" : ""}`}>
        <AvatarCard avatar={avatar} />
        <div className="chat-item-details">
          <div className="chat-item-name">{name}</div>
          {newMessageAlert && (
            <div className="chat-item-alert">
              {newMessageAlert.count} New Message
            </div>
          )}
        </div>
        {isOnline && <div className="online-indicator" />}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
