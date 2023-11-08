import React, { useState } from "react";
import MerchandiseCard from "./MerchandiseCard";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Merchandise.scss";
import removedLabelNames from "../selectors/removedLabelNames";

const Merchandise = ({ snapshotInfo, snapshotImageData }) => {
      const [viewMore, setViewMore] = useState(false);

      const handleViewMore = () => {
            setViewMore((prev) => !prev);
      };

      return snapshotInfo.objects ? (
            <Container>
                  <div className="card-toggle-button">
                        <Button
                              variant="outline-secondary"
                              onClick={handleViewMore}
                              size="sm"
                        >
                              {viewMore ? "View Less" : "View More"}
                        </Button>
                  </div>
                  <div className="merchandise-main-box">
                        {snapshotInfo.objects.map((items) => {
                              if (items.boxObjects) {
                                    return items.boxObjects.map((label) => {
                                          if (
                                                label.Confidence >
                                                      (viewMore ? 0 : 80) &&
                                                !removedLabelNames.find(
                                                      (removedLabelName) =>
                                                            removedLabelName ==
                                                            label.Name
                                                )
                                          ) {
                                                return (
                                                      <MerchandiseCard
                                                            key={label.Name}
                                                            label={label}
                                                            annotatedBox={
                                                                  items.annotatedBox
                                                            }
                                                            snapshotImageData={
                                                                  snapshotImageData
                                                            }
                                                      />
                                                );
                                          }
                                    });
                              }
                        })}
                  </div>
            </Container>
      ) : (
            <span>Analyse to show results.</span>
      );
};

export default Merchandise;
