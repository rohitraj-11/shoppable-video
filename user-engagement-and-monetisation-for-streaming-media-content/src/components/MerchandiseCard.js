import React, { useState, useEffect } from "react";
import getBoundingBoxImageData from "../utils/getBoundingBoxImageData";
import getAnnotatedBoxImageData from "../utils/getAnnotatedBoxImageData";
import getProductData from "../selectors/getProductData";

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/MerchandiseCard.scss";
import MerchandiseDetailsModal from "./MerchandiseDetailsModal";

const MerchandiseCard = ({ annotatedBox, label, snapshotImageData }) => {
      const [pic, setPic] = useState(null);
      const [productData, setProductData] = useState(null);
      const [modalShow, setModalShow] = useState(false);

      useEffect(() => {
            if (snapshotImageData != null && label.Instances.length > 0) {
                  const snapshotImageElement = document.createElement("img");
                  snapshotImageElement.src = snapshotImageData;
                  snapshotImageElement.onload = () => {
                        const picD = getBoundingBoxImageData(
                              snapshotImageElement,
                              annotatedBox,
                              label.Instances[0].BoundingBox
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
            const data = getProductData(label.Name);
            setProductData(data);
      }, []);
      return (
            <>
                  {/* <div className="card">
                        <div className="imgBx">
                              <img
                                    src={
                                          pic
                                                ? pic
                                                : "https://media.istockphoto.com/vectors/shopping-cart-icon-vector-id1128229893?k=20&m=1128229893&s=170667a&w=0&h=GcHTdZh_G8KczTeOuV-wZawlI8B1E_TA0THRHI1s2vI="
                                    }
                                    alt={`${label.Name}`}
                              />
                        </div>
                        <div className="details">
                              <h2>
                                    {label.Name}
                                    <br />
                              </h2>
                              <Button
                                    className="card-btn"
                                    size="sm"
                                    variant="outline-warning"
                                    target="_blank"
                              >
                                    Add to Cart
                              </Button>{" "}
                        </div>
                  </div> */}
                  <div>
                        {/* {JSON.stringify(label.Confidence)} */}
                        <Card style={{ width: "175px", height: "250px" }}>
                              <Card.Img
                                    className="imgBx2 img-fluid mx-auto"
                                    variant="top"
                                    src={pic}
                                    alt={`${label.Name}`}
                              />
                              <Card.Title className="cardtitle">
                                    {label.Name}
                              </Card.Title>
                              <ListGroup className="list-group-flush cardbuttons">
                                    {/* <ListGroupItem>
                                          <Button
                                                className="card-btn"
                                                size="sm"
                                                variant="outline-warning"
                                                target="_blank"
                                          >
                                                Add to Cart
                                          </Button>
                                    </ListGroupItem> */}
                                    <ListGroupItem>
                                          <>
                                                <Button
                                                      className="card-btn"
                                                      size="sm"
                                                      variant="outline-warning"
                                                      onClick={() =>
                                                            setModalShow(true)
                                                      }
                                                >
                                                      More Details
                                                </Button>

                                                <MerchandiseDetailsModal
                                                      show={modalShow}
                                                      productData={productData}
                                                      onHide={() =>
                                                            setModalShow(false)
                                                      }
                                                />
                                          </>
                                    </ListGroupItem>
                              </ListGroup>
                        </Card>
                  </div>
            </>
      );
};

export default MerchandiseCard;
