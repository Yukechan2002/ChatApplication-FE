import {
  faCalendarAlt,
  faEnvelope,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import "./Profile.css";
import { transformImage } from "../../lib/features";

const Profile = ({user}) => {
  return (
    <div className="profile-container">
      <Card.Img
        className="profile-avatar"
        src={transformImage(user?.avatar?.url)}
      />
      <ProfileCard
        heading="Bio"
        text={user?.bio}
        Icon={<FontAwesomeIcon icon={faUserEdit} />}
      />

      <ProfileCard
        heading="Username"
        text={user?.username}
        Icon={<FontAwesomeIcon icon={faEnvelope} />}
      />

      <ProfileCard
        heading="Name"
        text={user?.name}
        Icon={<FontAwesomeIcon icon={faUser} />}
      />

      <ProfileCard
        heading="Joined"
        text={moment(user?.createdAt).fromNow()}
        Icon={<FontAwesomeIcon icon={faCalendarAlt} />}
      />
    </div>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <div className="profile-card d-flex align-items-center">
    {Icon && <div className="profile-icon">{Icon}</div>}
    <div className="profile-info">
      <p className="profile-heading">{heading}</p>
      <p className="profile-text">{text}</p>
    </div>
  </div>
);

export default Profile;
