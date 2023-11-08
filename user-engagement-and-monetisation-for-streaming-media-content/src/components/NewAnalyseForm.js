import React, { useContext, useEffect, useState } from "react";
import storeAllCroppedImageData from "../utils/storeAllCroppedImageData";
import UserInfoContext from "../context/user-info-context";
import SnapshotsInfoContext from "../context/snapshots-info-context";
import RecommendationsInfoContext from "../context/recommendations-info-context";
import { API } from "aws-amplify";
import moment from "moment";

import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { toast } from "react-toastify";

import "../styles/NewAnalyseForm.scss";

const NewAnalyseForm = ({ snapshotInfo, allCroppedImageData }) => {
      const { userInfo } = useContext(UserInfoContext);
      const { snapshotsInfoDispatch } = useContext(SnapshotsInfoContext);
      const { recommendationsInfo } = useContext(RecommendationsInfoContext);
      const [disableAnalyse, setDisableAnalyse] = useState(false);
      const [aCelebritiesProfile, setACelebritiesProfile] = useState(false);
      const [bMerchandiseBuy, setBMerchandiseBuy] = useState(false);
      const [likeSnapshot, setLikeSnapshot] = useState(snapshotInfo.liked);

      useEffect(() => {
            if (allCroppedImageData.length === 0) {
                  setDisableAnalyse(true);
            } else {
                  setDisableAnalyse(false);
            }
      }, [allCroppedImageData]);

      // useEffect(() => {
      //       console.log(aCelebritiesProfile, bMerchandiseBuy);
      // }, [aCelebritiesProfile, bMerchandiseBuy]);

      const onACelebritiesProfilechange = (e) => {
            setACelebritiesProfile(() => e.target.checked);
      };

      const onBMerchandiseBuychange = (e) => {
            setBMerchandiseBuy(() => e.target.checked);
      };

      const handleLike = (e) => {
            setLikeSnapshot(true);
      };

      const handleDislike = (e) => {
            setLikeSnapshot(false);
      };

      async function handleAnalyse() {
            snapshotsInfoDispatch({
                  type: "UPDATE_SNAPSHOT",
                  snapshotID: snapshotInfo.snapshotID,
                  updates: {
                        isInProcess: true,
                  },
            });
            if (aCelebritiesProfile || bMerchandiseBuy) {
                  toast.info("🔍 Analying!", {});
                  setDisableAnalyse(true);

                  const selectedAreasData = await storeAllCroppedImageData(
                        allCroppedImageData
                  );

                  const myInit = {
                        headers: {},
                        body: {
                              aCelebritiesProfile,
                              bMerchandiseBuy,
                              selectedAreasData,
                              userIdentityID: userInfo.userIdentityID,
                        },
                  };
                  try {
                        const responseData = await API.post(
                              "lookupobjectsapi",
                              "/identifiedobjects",
                              myInit
                        );

                        const allLabels = [];
                        const allCelebrities = [];

                        responseData.forEach((element) => {
                              allLabels.push({
                                    annotatedBox: element.annotatedBox,
                                    boxObjects: element.labels,
                              });
                              allCelebrities.push({
                                    annotatedBox: element.annotatedBox,
                                    boxCelebrities:
                                          element.customIdentifiedCelebrities,
                              });
                        });

                        ///////////////////////////////////////////////////////
                        const analysedCelebs = [];
                        allCelebrities.map((item) => {
                              item.boxCelebrities.map((celeb, index) => {
                                    const len = celeb.Urls[1].length;
                                    const celebID = celeb.Urls[1].substring(
                                          len - 9,
                                          len + 1
                                    );
                                    analysedCelebs.push(celebID);
                                    // const aa = `test${index}`;
                                    // analysedCelebs.push(aa);
                              });
                        });
                        // console.log(analysedCelebs);

                        const impressionData = [];
                        recommendationsInfo.recommendations.forEach((item) => {
                              impressionData.push(item.itemId);
                        });
                        const putEventInit = {
                              body: {
                                    impression: impressionData,
                                    itemsID: analysedCelebs,
                                    userID: userInfo.userIdentityID,
                                    recommendationID:
                                          recommendationsInfo.recommendationID,
                                    sessionID: userInfo.userIdentityID,
                              },
                        };
                        // console.log(putEventInit);
                        if (analysedCelebs.length) {
                              const putEventData = await API.post(
                                    "lookupobjectsapi",
                                    "/puteventanalysed",
                                    putEventInit
                              );
                              // console.log("putEvent", putEventData);
                        }

                        //////////////////////////////////////////////////////

                        const updatedAt = moment().toISOString();
                        const updateSnapshotInit = {
                              body: {
                                    ...snapshotInfo,
                                    celebrities: allCelebrities,
                                    liked: likeSnapshot,
                                    objects: allLabels,
                                    updatedAt,
                                    userIdentityID: userInfo.userIdentityID,
                                    routeKey: "UPDATE /snapshots/{snapshotID}",
                              },
                        };

                        const updateResponseData = await API.post(
                              "lookupobjectsapi",
                              "/snapshots",
                              updateSnapshotInit
                        );

                        snapshotsInfoDispatch({
                              type: "UPDATE_SNAPSHOT",
                              snapshotID: snapshotInfo.snapshotID,
                              updates: {
                                    celebrities: allCelebrities,
                                    liked: likeSnapshot,
                                    objects: allLabels,
                                    updatedAt,
                              },
                        });
                        // console.log(
                        //       "************API Analyse**********",
                        //       responseData
                        // );
                        toast.success("👓 Have a look at your results!", {});
                        setDisableAnalyse(false);
                  } catch (error) {
                        console.log("++++", error);
                        setDisableAnalyse(false);
                        toast.error("Error! Try again!", {});
                  }
            } else {
                  toast.warning("No analyse options selected!", {});
            }
            snapshotsInfoDispatch({
                  type: "UPDATE_SNAPSHOT",
                  snapshotID: snapshotInfo.snapshotID,
                  updates: {
                        isInProcess: false,
                  },
            });
      }

      // async function handleRemoveSnapshot() {
      //       snapshotsInfoDispatch({
      //             type: "REMOVE_SNAPSHOT",
      //             snapshotID: snapshotInfo.snapshotID,
      //       });
      // }

      return (
            <Container>
                  <div className="analyse-form-box">
                        <Form className="personalize-form">
                              <Form.Check
                                    onChange={onACelebritiesProfilechange}
                                    className="opt"
                                    id={`aCelebritiesProfile${snapshotInfo.snapshotID}`}
                                    label="Get celebrities profile!"
                                    type="switch"
                              />
                              <Form.Check
                                    onChange={onBMerchandiseBuychange}
                                    className="opt"
                                    id={`bMerchandiseBuy${snapshotInfo.snapshotID}`}
                                    label="Suggest Merchandise Buy!"
                                    type="switch"
                              />
                              <br></br>
                              <Row>
                                    <Col>
                                          <div className="d-grid gap-2">
                                                <Button
                                                      disabled={disableAnalyse}
                                                      onClick={handleAnalyse}
                                                      variant="success"
                                                >
                                                      Analyse
                                                </Button>
                                                {/* <Button
                                          variant="outline-secondary"
                                          onClick={handleRemoveSnapshot}
                                          >
                                          Remove Snapshot
                                    </Button> */}
                                          </div>
                                    </Col>
                                    <Col xs={1}>
                                          {likeSnapshot ? (
                                                <LikeFilled
                                                      style={{
                                                            fontSize: "25px",
                                                            color: "#2196f3",
                                                            paddingTop: "5px",
                                                      }}
                                                      onClick={handleDislike}
                                                />
                                          ) : (
                                                <LikeOutlined
                                                      style={{
                                                            fontSize: "25px",
                                                            color: "#2196f3",
                                                            paddingTop: "5px",
                                                      }}
                                                      onClick={handleLike}
                                                />
                                          )}
                                    </Col>
                              </Row>
                        </Form>
                  </div>
            </Container>
      );
};

export default NewAnalyseForm;
