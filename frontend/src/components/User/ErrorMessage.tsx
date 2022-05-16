import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", input = ""}) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{input}</strong>
    </Alert>
  );
};

export default ErrorMessage;