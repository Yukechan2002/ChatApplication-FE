import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import { userExists } from "../redux/reducer/auth";
import Footer from "../components/layout/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const username = useInputValidation("");
  const password = useInputValidation("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        {
          username: username.value,
          password: password.value,
        },
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div>
            <h2 className="app-description">Dhee Chat</h2>
            <p className="app-tagline">
              Connect, Communicate, Collaborate, Celebrate
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="login-card ">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3 position-relative">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username.value}
                  onChange={username.changeHandler}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  value={password.value}
                  onChange={password.changeHandler}
                  required
                  autoComplete="current-password"
                />
                <span
                  className="eye-icon"
                  id="login-eye"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    className="password-icon"
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isLoading}
              >
                Login
              </button>
              <div className="separator">OR</div>
              <Link to="/signup" className="btn btn-link " disabled={isLoading}>
                Sign Up Instead
              </Link>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
