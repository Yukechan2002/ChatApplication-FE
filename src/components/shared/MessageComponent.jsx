import React, { memo } from "react";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import "./MessageComponent.css"; // Custom CSS for additional styling
import { motion } from "framer-motion";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
        wordWrap: "break-word", // Ensure long words break into new lines
      }}
      className={`message-component ${
        sameSender ? "align-self-end" : "align-self-start"
      }`}
    >
      {!sameSender && (
        <p className="sender-name text-primary font-weight-bold">
          {sender.name}
        </p>
      )}
      {content && <p className="message-content">{content}</p>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <div key={index} className="attachment">
              <a href={url} target="_blank" download className="text-dark">
                {RenderAttachment(file, url)}
              </a>
            </div>
          );
        })}

      <p className="text-secondary small mb-0">{timeAgo}</p>
    </motion.div>
  );
};

export default memo(MessageComponent);
