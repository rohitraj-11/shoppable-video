import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/CelebrityDetailsModal.scss";

const CelebrityDetailsModal = ({ celebrityData, show, onHide }) => {
      // useEffect(() => {
      //    console.log(props);
      // }, []);
      return (
            <Modal
                  show={show}
                  onHide={onHide}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            >
                  <Modal.Header closeButton>
                        {celebrityData ? (
                              <Modal.Title id="contained-modal-title-vcenter">
                                    {`${celebrityData.Name}`}
                              </Modal.Title>
                        ) : (
                              <Modal.Title id="contained-modal-title-vcenter">
                                    {`We don't have any details for now.`}
                              </Modal.Title>
                        )}
                  </Modal.Header>
                  {celebrityData && (
                        <Modal.Body>
                              {celebrityData.About && (
                                    <p style={{ textAlign: "justify" }}>
                                          {celebrityData.About}
                                    </p>
                              )}
                              <Row>
                                    <Col>
                                          <div className="cmovie-box">
                                                <img
                                                      src={`${celebrityData.Movies[0].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "220px",
                                                      }}
                                                />
                                                <p className="cmovie">
                                                      {
                                                            celebrityData
                                                                  .Movies[0]
                                                                  .Movie
                                                      }
                                                </p>
                                          </div>
                                    </Col>
                                    <Col>
                                          <div className="cmovie-box">
                                                <img
                                                      src={`${celebrityData.Movies[1].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "220px",
                                                      }}
                                                />
                                                <p className="cmovie">
                                                      {
                                                            celebrityData
                                                                  .Movies[1]
                                                                  .Movie
                                                      }
                                                </p>
                                          </div>
                                    </Col>
                              </Row>
                              <Row>
                                    <Col>
                                          <div className="cmovie-box">
                                                <img
                                                      src={`${celebrityData.Movies[2].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "220px",
                                                      }}
                                                />
                                                <p className="cmovie">
                                                      {
                                                            celebrityData
                                                                  .Movies[2]
                                                                  .Movie
                                                      }
                                                </p>
                                          </div>
                                    </Col>
                                    <Col>
                                          <div className="cmovie-box">
                                                <img
                                                      src={`${celebrityData.Movies[3].ID}`}
                                                      className="img-fluid"
                                                      alt="sample"
                                                      style={{
                                                            height: "300px",
                                                            width: "220px",
                                                      }}
                                                />
                                                <p className="cmovie">
                                                      {
                                                            celebrityData
                                                                  .Movies[3]
                                                                  .Movie
                                                      }
                                                </p>
                                          </div>
                                    </Col>
                              </Row>
                        </Modal.Body>
                  )}
                  <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                  </Modal.Footer>
            </Modal>
      );
};

export default CelebrityDetailsModal;
