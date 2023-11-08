import React, { useEffect } from "react";
import CelebrityCard from "../components/CelebrityCard";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Celebrities.scss";

const Celebrities = ({ snapshotInfo, snapshotImageData }) => {
      return snapshotInfo.celebrities ? (
            <Container className="celebs-main-box">
                  {snapshotInfo.celebrities.map((items) => {
                        return items.boxCelebrities.map((celeb) => {
                              return (
                                    <CelebrityCard
                                          key={celeb.Name}
                                          celeb={celeb}
                                          snapshotImageData={snapshotImageData}
                                          annotatedBox={items.annotatedBox}
                                    />
                              );
                        });
                  })}
            </Container>
      ) : (
            <span>Analyse to show results.</span>
      );
};

export default Celebrities;
