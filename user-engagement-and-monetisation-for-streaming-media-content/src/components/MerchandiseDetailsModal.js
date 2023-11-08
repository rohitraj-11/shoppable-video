import React, { useEffect } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/MerchandiseDetailsModal.scss";

const MerchandiseDetailsModal = ({ productData, show, onHide }) => {
      useEffect(() => {
            // console.log(props);
      }, []);
      return (
            <Modal
                  show={show}
                  onHide={onHide}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            >
                  <Modal.Header closeButton>
                        {productData ? (
                              <Modal.Title id="contained-modal-title-vcenter">
                                    {`${productData.Name}`}
                              </Modal.Title>
                        ) : (
                              <Modal.Title id="contained-modal-title-vcenter">
                                    {`We don't have any details for now.`}
                              </Modal.Title>
                        )}
                  </Modal.Header>
                  {productData && (
                        <Modal.Body>
                              <Container>
                                    <Row>
                                          <Col>
                                                <img
                                                      src={`${productData.Listings[0].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "300px",
                                                      }}
                                                />
                                                <div>
                                                      <span
                                                            className="details-prop"
                                                            style={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                      >{`Price:   `}</span>
                                                      <span>
                                                            {" "}
                                                            {`${productData.Listings[0].Price}`}
                                                      </span>
                                                </div>
                                                <div className="hc-btn-box">
                                                      <Button
                                                            className="card-btn"
                                                            variant="outline-warning"
                                                            href={`${productData.Listings[0].Link}`}
                                                            target="_blank"
                                                            size="sm"
                                                      >
                                                            Buy at Amazon
                                                      </Button>
                                                </div>
                                          </Col>
                                          <Col>
                                                <img
                                                      src={`${productData.Listings[1].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "300px",
                                                      }}
                                                />
                                                <div>
                                                      <span
                                                            className="details-prop"
                                                            style={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                      >{`Price:   `}</span>
                                                      <span>
                                                            {" "}
                                                            {`${productData.Listings[1].Price}`}
                                                      </span>
                                                </div>
                                                <div className="hc-btn-box">
                                                      <Button
                                                            className="card-btn"
                                                            variant="outline-warning"
                                                            href={`${productData.Listings[1].Link}`}
                                                            target="_blank"
                                                            size="sm"
                                                      >
                                                            Buy at Amazon
                                                      </Button>
                                                </div>
                                          </Col>
                                    </Row>
                                    <Row>
                                          <Col>
                                                <img
                                                      src={`${productData.Listings[2].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "300px",
                                                      }}
                                                />
                                                <div>
                                                      <span
                                                            className="details-prop"
                                                            style={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                      >{`Price:   `}</span>
                                                      <span>
                                                            {" "}
                                                            {`${productData.Listings[2].Price}`}
                                                      </span>
                                                </div>
                                                <div className="hc-btn-box">
                                                      <Button
                                                            className="card-btn"
                                                            variant="outline-warning"
                                                            href={`${productData.Listings[2].Link}`}
                                                            target="_blank"
                                                            size="sm"
                                                      >
                                                            Buy at Amazon
                                                      </Button>
                                                </div>
                                          </Col>
                                          <Col>
                                                <img
                                                      src={`${productData.Listings[3].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "300px",
                                                      }}
                                                />
                                                <div>
                                                      <span
                                                            className="details-prop"
                                                            style={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                      >{`Price:   `}</span>
                                                      <span>
                                                            {" "}
                                                            {`${productData.Listings[3].Price}`}
                                                      </span>
                                                </div>
                                                <div className="hc-btn-box">
                                                      <Button
                                                            className=""
                                                            variant="outline-warning"
                                                            href={`${productData.Listings[3].Link}`}
                                                            target="_blank"
                                                            size="sm"
                                                      >
                                                            Buy at Amazon
                                                      </Button>
                                                </div>
                                          </Col>
                                    </Row>
                              </Container>
                        </Modal.Body>
                  )}
                  <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                  </Modal.Footer>
            </Modal>
      );
};

export default MerchandiseDetailsModal;
