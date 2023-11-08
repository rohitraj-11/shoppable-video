import React from "react";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/VideoTitle.scss";

const VideoTitle = ({ name, info }) => {
      return (
            <Container>
                  <h1 className="video-title-box">{name}</h1>
                  <p className="video-info-box">{info}</p>
            </Container>
      );
};

export default VideoTitle;
