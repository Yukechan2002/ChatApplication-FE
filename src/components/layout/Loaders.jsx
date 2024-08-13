import React from "react";
import "./Loaders.css";
import { Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <div className="container-fluid layout-loader">
      <div className="row h-100">
        <div className="col-12 col-sm-4 col-md-3 d-none d-sm-block h-100">
          <div className="skeleton rectangular skeleton-full"></div>
        </div>
        <div className="col-12 col-sm-8 col-md-5 col-lg-6 h-100">
          <div className="stack">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="skeleton rectangular skeleton-item"
              ></div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3 d-none d-sm-block h-100">
          <div className="skeleton rectangular skeleton-full"></div>
        </div>
      </div>
    </div>
  );
};
const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };