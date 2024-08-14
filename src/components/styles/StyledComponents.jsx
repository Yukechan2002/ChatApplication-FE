import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { grayColor } from "../../constants/color";

import { keyframes, Skeleton, styled } from "@mui/material";
const VisuallyHiddenInput = (props) => (
  <input
    {...props}
    style={{
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: 1,
    }}
  />
);

const Link = (props) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
    padding: "4px",
  };

  const hoverStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  return (
    <RouterLink
      {...props}
      style={linkStyle}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    />
  );
};

const InputBox = (props) => (
  <input
    {...props}
    style={{
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      padding: "0 3rem",
      borderRadius: "1.5rem",
      backgroundColor: grayColor,
    }}
  />
);

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export { InputBox, Link, VisuallyHiddenInput, BouncingSkeleton };
