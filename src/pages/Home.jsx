import React from "react";
import AppLayout from "../components/layout/AppLayout";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <p className="home-message">Select a friend to chat</p>
      <div className="imageFrame">
        <img src="Chat.png" alt="Chat" />
      </div>
    </div>
  );
};

export default AppLayout()(Home);
