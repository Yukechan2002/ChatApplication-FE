import React from "react";
import ChatItem from "../shared/ChatItem";
import "./ChatList.css";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div
      className="container-fluid p-0"
      style={{ width: w, height: "100%", overflowY: "auto" }}
    >
      <ul className="list-group">
        {chats.map((data, index) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
          
            ({ chatId }) => chatId === _id
          );

          const isOnline = members.some((member) =>
            onlineUsers.includes(member._id)
          );

          return (
            <li key={_id} className="list-group-item p-0">
              <ChatItem
                _id={_id}
                index={index}
                newMessageAlert={newMessageAlert}
                isOnline={isOnline}
                avatar={avatar}
                name={name}
                groupChat={groupChat}
                sameSender={chatId === _id}
                handleDeletedChat={handleDeleteChat}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
