import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import Footer from "../components/layout/Footer";

const capitalizeWords = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async (values, { setSubmitting }) => {
    const toastId = toast.loading("Signing Up...");
    const formData = new FormData();
    formData.append("avatar", values.avatar);
    formData.append("name", capitalizeWords(values.name));
    formData.append("bio", values.bio);
    formData.append("username", values.username);
    formData.append("password", values.password);

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/user/new`,
        formData,
        config
      );
      toast.success(data.message, { id: toastId });
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed()
      .required("Avatar is required")
      .test(
        "fileSize",
        "Only one file is allowed",
        (value) => value && value.size <= 1 * 1024 * 1024
      ),
    name: Yup.string().required("Name is required"),
    username: Yup.string()
      .required("Username is required")
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Only alphanumeric characters, underscores, and dashes are allowed"
      ),
    bio: Yup.string().required("Bio is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div>
            <h2 className="app-description text-center">Sign Up</h2>
            <h2 className="app-description">Join Dhee Chat</h2>
            <p className="app-tagline">
              Create, Connect, Collaborate, Celebrate
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="registration-card">
            <Formik
              initialValues={{
                avatar: null,
                name: "",
                username: "",
                bio: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="avatar-container mb-3">
                    <Field name="avatar">
                      {({ field, form }) => (
                        <>
                          {form.values.avatar ? (
                            <img
                              className="avatar"
                              src={URL.createObjectURL(form.values.avatar)}
                              alt="Avatar"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              className="avatar-default"
                            />
                          )}
                          <div className="pro-lab">
                            <label
                              htmlFor="profilePicture"
                              className="btn btn-secondary btn-sm"
                            >
                              Choose Profile
                              <input
                                type="file"
                                className="form-control-file"
                                id="profilePicture"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                  setFieldValue(
                                    "avatar",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </Field>
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  {/* Name and Username fields side by side */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="name">
                          Name<span className="span-clr">*</span>
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          autoComplete="name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error-text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="username">
                          Username<span className="span-clr">*</span>
                        </label>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          className="form-control"
                          autoComplete="username"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="error-text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="bio">
                      Bio<span className="span-clr">*</span>
                    </label>
                    <Field
                      type="text"
                      id="bio"
                      name="bio"
                      className="form-control"
                      autoComplete="bio"
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">
                      Password<span className="span-clr">*</span>
                    </label>
                    <div className="password-wrapper">
                      <Field
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                        autoComplete="current-password"
                      />
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                  <div className="separator mb-3">OR</div>
                  <Link
                    to="/login"
                    className="btn btn-secondary btn-block login-btnn"
                    disabled={isSubmitting}
                  >
                    Login Instead
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
