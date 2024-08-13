import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({ user}) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Sorry, the page you are looking for does not exist.
        </p>
        {user? (
          <Link to="/" className="btn btn-primary not-found-button">
            Go to Home
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary not-found-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
