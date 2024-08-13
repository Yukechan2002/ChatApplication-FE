import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Dhee Chat",
  description = "This is the Chat App called DheeChat",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
