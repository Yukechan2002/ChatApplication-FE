import {
  faFile
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { transformImage } from "../../lib/features";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width="200"
          controls
          className="img-fluid"
        />
      );

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Image"
          width="200"
          height="150"
          className="img-fluid"
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls className="w-100" />;

    default:
      return (
        <div className="d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faFile} size="2x" />
        </div>
      );
  }
};

export default RenderAttachment;
