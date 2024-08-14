import {
  faCalendarAlt,
  faEdit,
  faEnvelope,
  faTrash,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import "./Profile.css";
import { transformImage } from "../../lib/features";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth";
import toast from "react-hot-toast";

const Profile = ({ user: initialUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(
        `${server}/api/user/me/delete/${user._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Profile Deleted Successfully");
        setShowModal(false);
        dispatch(userNotExists()); // Ensure user is logged out or redirected
        navigate("/login"); // Redirect to login or any other page
      } else {
        throw new Error("Failed to delete profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to delete profile");
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(
        `${server}/api/user/me/update/${user._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data.user); // Update user state with the new data
        toast.success("Profile Updated Successfully");
        setShowEdit(false);
      } else {
        throw new Error("Failed to update profile 1");
      }
    } catch (error) {
      
      toast.error("Username already exist");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="profile-container">
      <Card.Img
        className="profile-avatar"
        src={transformImage(user?.avatar?.url)}
        alt="Profile Avatar"
      />
      <ProfileCard
        heading="Name"
        text={user?.name}
        Icon={<FontAwesomeIcon icon={faUser} />}
      />
      <ProfileCard
        heading="Username"
        text={user?.username}
        Icon={<FontAwesomeIcon icon={faEnvelope} />}
      />

      <ProfileCard
        heading="Bio"
        text={user?.bio}
        Icon={<FontAwesomeIcon icon={faUserEdit} />}
      />

      <ProfileCard
        heading="Joined"
        text={moment(user?.createdAt).fromNow()}
        Icon={<FontAwesomeIcon icon={faCalendarAlt} />}
      />
      <div className="profile-actions">
        {/* Edit Profile Button */}
        <Button
          variant="secondary"
          className="edit-profile-btn"
          onClick={() => setShowEdit(true)}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit Profile
        </Button>

        {/* Delete Profile Button */}
        <Button
          variant="danger"
          onClick={() => setShowModal(true)}
          className="delete-button"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Profile
        </Button>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
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
