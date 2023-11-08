import React, { useEffect, useState } from "react";
import getBoundingBoxImageData from "../utils/getBoundingBoxImageData";
import getAnnotatedBoxImageData from "../utils/getAnnotatedBoxImageData";
import getCelebrityData from "../selectors/getCelebrityData";
import CelebrityDetailsModal from "./CelebrityDetailsModal";

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/CelebrityCard.scss";

const CelebrityCard = ({ annotatedBox, celeb, snapshotImageData }) => {
      const [pic, setPic] = useState(null);
      const [celebrityData, setCelebrityData] = useState(null);
      const [modalShow, setModalShow] = useState(false);

      useEffect(() => {
            if (snapshotImageData != null) {
                  const snapshotImageElement = document.createElement("img");
                  snapshotImageElement.src = snapshotImageData;
                  snapshotImageElement.onload = () => {
                        const picD = getBoundingBoxImageData(
                              snapshotImageElement,
                              annotatedBox,
                              celeb.BoundingBox
                        );
                        setPic(picD);
                  };
            } else {
                  const snapshotImageElement = document.createElement("img");
                  snapshotImageElement.src = snapshotImageData;
                  snapshotImageElement.onload = () => {
                        const picD = getAnnotatedBoxImageData(
                              snapshotImageElement,
                              annotatedBox
                        );
                        setPic(picD);
                  };
            }
      }, [snapshotImageData]);

      useEffect(() => {
            const data = getCelebrityData(celeb.Name);
            setCelebrityData(data);
      }, []);

      return (
            // <div className="card">
            //       <div className="imgBx">
            //             <img src={pic} alt={`${celeb.Name}`} />
            //       </div>
            //       <div className="details">
            //             <h2>
            //                   {celeb.Name}
            //                   <br />
            //             </h2>
            //             <Button
            //                   className="card-btn"
            //                   size="sm"
            //                   variant="outline-warning"
            //                   href={`https://${celeb.Urls[0]}`}
            //                   target="_blank"
            //             >
            //                   WIKIDATA
            //             </Button>{" "}
            //             <Button
            //                   className="card-btn"
            //                   size="sm"
            //                   variant="outline-warning"
            //                   href={`https://${celeb.Urls[1]}`}
            //                   target="_blank"
            //             >
            //                   IMDb
            //             </Button>
            //       </div>
            // </div>
            <div>
                  <Card style={{ width: "175px", height: "280px" }}>
                        <Card.Img
                              className="imgBx2 img-fluid mx-auto"
                              variant="top"
                              src={pic}
                              alt={`${celeb.Name}`}
                        />
                        <Card.Title className="cardtitle">
                              {celeb.Name}
                        </Card.Title>
                        <ListGroup className="list-group-flush cardbuttons">
                              <ListGroupItem>
                                    <Button
                                          size="sm"
                                          variant="outline-warning"
                                          href={`https://${celeb.Urls[0]}`}
                                          target="_blank"
                                    >
                                          WIKIDATA
                                    </Button>{" "}
                                    <Button
                                          size="sm"
                                          variant="outline-warning"
                                          href={`https://${celeb.Urls[1]}`}
                                          target="_blank"
                                    >
                                          IMDb
                                    </Button>
                              </ListGroupItem>
                              <ListGroupItem>
                                    <>
                                          <Button
                                                className="card-btn-modal"
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() =>
                                                      setModalShow(true)
                                                }
                                          >
                                                More Details
                                          </Button>

                                          <CelebrityDetailsModal
                                                show={modalShow}
                                                celebrityData={celebrityData}
                                                onHide={() =>
                                                      setModalShow(false)
                                                }
                                          />
                                    </>
                              </ListGroupItem>
                        </ListGroup>
                  </Card>
            </div>
      );
};

export default CelebrityCard;
