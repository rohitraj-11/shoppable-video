import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import "../styles/LoadingPage.scss";

const LoadingPage = () => {
      return (
            <div className="my-loader">
                  <Spinner animation="border" style={{ color: "#2196f3" }} />
            </div>
      );
};

export default LoadingPage;
