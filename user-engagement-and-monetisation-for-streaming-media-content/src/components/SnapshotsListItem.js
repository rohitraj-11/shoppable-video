import React, { useContext, useEffect, useState } from "react";
import SnapshotsInfoContext from "../context/snapshots-info-context";
import UserInfoContext from "../context/user-info-context";
import ResultTabs from "./ResultTabs";
import { API } from "aws-amplify";
import { toast } from "react-toastify";
import moment from "moment";
import imageToBase64 from "image-to-base64/browser";

import { Accordion, CloseButton, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/SnapshotsList.scss";

const SnapshotsListItem = ({ snapshotInfo, index }) => {
      const { snapshotsInfoDispatch } = useContext(SnapshotsInfoContext);
      const { userInfo } = useContext(UserInfoContext);

      const [snapshotImageData, setSnapshotImageData] = useState(null);

      async function handleRemoveSnapshot(id) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Do you want to delete the snapshot?")) {
                  try {
                        const deleteSnapshotInit = {
                              body: {
                                    snapshotID: id,
                                    userIdentityID: userInfo.userIdentityID,
                                    routeKey: "DELETE /snapshots/{snapshotID}",
                              },
                        };

                        const deleteResponseData = await API.post(
                              "lookupobjectsapi",
                              "/snapshots",
                              deleteSnapshotInit
                        );

                        snapshotsInfoDispatch({
                              type: "REMOVE_SNAPSHOT",
                              snapshotID: id,
                        });
                        toast.success("Snapshot removed!", {});
                  } catch (error) {
                        console.log("-------", error);
                        toast.error("Error! Try again!", {});
                  }
            }
      }

      useEffect(() => {
            const snapshotImageURL = `${process.env.REACT_APP_CLOUDFRONT_LINK}/private/${userInfo.userIdentityID}/${snapshotInfo.snapshotID}.png`;
            imageToBase64(snapshotImageURL).then((response) => {
                  setSnapshotImageData(`data:image/png;base64,${response}`);
            });
      }, []);

      return (
            <Accordion.Item eventKey={index} key={snapshotInfo.snapshotID}>
                  <Accordion.Header>
                        <Container>
                              <Row>
                                    <Col className="accordion-title">
                                          <h1 className="snapshot-date">
                                                {moment(
                                                      snapshotInfo.createdAt
                                                ).format("DD-MMM-YYYY")}
                                          </h1>
                                    </Col>
                                    <Col className="accordion-title">
                                          <h1 className="snapshot-show">
                                                {snapshotInfo.videoName
                                                      ? snapshotInfo.videoName
                                                      : "Anonymous"}
                                          </h1>
                                    </Col>
                                    <Col className="accordion-title">
                                          <img
                                                alt="Snapshot"
                                                className="snapshot-frame"
                                                src={`${process.env.REACT_APP_CLOUDFRONT_LINK}/private/${userInfo.userIdentityID}/${snapshotInfo.snapshotID}.png`}
                                                style={{
                                                      height: 54,
                                                      width: 96,
                                                }}
                                          ></img>{" "}
                                          <div className="del-btn-box">
                                                <CloseButton
                                                      className="del-btn"
                                                      onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            handleRemoveSnapshot(
                                                                  snapshotInfo.snapshotID
                                                            );
                                                      }}
                                                />
                                          </div>
                                    </Col>
                                    <Col className="accordion-title">
                                          <h1>
                                                {snapshotInfo.isInProcess ? (
                                                      <span
                                                            style={{
                                                                  color: "#e9c46a",
                                                            }}
                                                      >
                                                            In-Process
                                                      </span>
                                                ) : snapshotInfo.celebrities ||
                                                  snapshotInfo.objects ? (
                                                      <span
                                                            style={{
                                                                  color: "#38b000",
                                                            }}
                                                      >
                                                            Ready
                                                      </span>
                                                ) : (
                                                      <span
                                                            style={{
                                                                  color: "#e63946",
                                                            }}
                                                      >
                                                            Analyse
                                                      </span>
                                                )}
                                          </h1>
                                    </Col>
                              </Row>
                        </Container>
                  </Accordion.Header>
                  <Accordion.Body>
                        <ResultTabs
                              snapshotInfo={snapshotInfo}
                              snapshotImageData={snapshotImageData}
                        />
                  </Accordion.Body>
            </Accordion.Item>
      );
};

export default SnapshotsListItem;
