import React, { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validator";
import { Link } from "react-router-dom";
import "./SignUp.css";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducer/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"; // Default profile icon

const SignUp = () => {
  const dispatch = useDispatch();
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing In...");
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div>
            <h2 className="app-description">Join Dhee Chat</h2>
            <p className="app-tagline">
              Create, Connect, Collaborate, Celebrate
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="registration-card">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="avatar-container mb-3">
                {avatar.preview ? (
                  <img className="avatar" src={avatar.preview} alt="Avatar" />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="avatar-default"
                  />
                )}
                {avatar.error && (
                  <div className="error-message">{avatar.error}</div>
                )}
                <div className="pro-lab">
                  {" "}
                  <label
                    htmlFor="profilePicture"
                    className="btn btn-secondary btn-sm"
                  >
                    Choose Profile
                    <input
                      type="file"
                      className="form-control-file"
                      id="profilePicture"
                      onChange={avatar.changeHandler}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="name">
                  Name<span className="span-clr">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name.value}
                  onChange={name.changeHandler}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="username">
                  Username<span className="span-clr">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username.value}
                  onChange={username.changeHandler}
                  required
                  autoComplete="username"
                />
                {username.error && (
                  <div className="error-message">{username.error}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="bio">
                  Bio<span className="span-clr">*</span>
                </label>
                <input
                  type="text"
                  id="bio"
                  className="form-control"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  required autoComplete="bio"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">
                  Password<span className="span-clr">*</span>
                </label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="form-control"
                    value={password.value}
                    onChange={password.changeHandler}
                    required
                    autoComplete="current-password"
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                    className="password-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {password.error && (
                  <div className="error-message">{password.error}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-3"
                disabled={isLoading}
              >
                Sign Up
              </button>
              <div className="separator mb-3">OR</div>
              <Link to="/login" className="btn btn-link" disabled={isLoading}>
                Login Instead
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
