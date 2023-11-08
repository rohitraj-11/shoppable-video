import React, { useContext, useEffect, useState } from "react";
import SnapshotsList from "./SnapshotsList";
import SnapshotsListFilters from "./SnapshotsListFilters";
import SnapshotsInfoContext from "../context/snapshots-info-context";
import UserInfoContext from "../context/user-info-context";
import FiltersInfoContext from "../context/filters-info-context";
import getVisibleSnapshots from "../selectors/getVisibleSnapshots";
import { API } from "aws-amplify";

import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/SnapshotsPage.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPage from "./LoadingPage";

const SnapshotsPage = ({ lastEvaluatedKey, handleLastEvaluatedKey }) => {
      const { filtersInfo } = useContext(FiltersInfoContext);
      const { snapshotsInfo, snapshotsInfoDispatch } =
            useContext(SnapshotsInfoContext);
      const { userInfo } = useContext(UserInfoContext);

      const [filteredSnapshotsInfo, setFilteredSnapshotsInfo] = useState([]);
      const [fetchingNextSnapshots, setFetchingNextSnapshots] = useState(false);

      async function getNextSnapshotsFromDB() {
            console.log("C", !fetchingNextSnapshots, lastEvaluatedKey);
            if (!!lastEvaluatedKey && !fetchingNextSnapshots) {
                  console.log("D");

                  setFetchingNextSnapshots((prev) => {
                        return true;
                  });
                  const getAllSnapshotInit = {
                        body: {
                              userIdentityID: userInfo.userIdentityID,
                              routeKey: "GET /snapshots",
                              exclusiveStartKey: lastEvaluatedKey,
                              limit: 10,
                        },
                  };
                  const getAllResponseData = await API.post(
                        "lookupobjectsapi",
                        "/snapshots",
                        getAllSnapshotInit
                  );

                  getAllResponseData.Items.forEach((item) => {
                        const { userIdentityID, ...snapshotInfo } = item;
                        let add = true;
                        snapshotsInfo.map((stateSnapshotInfo) => {
                              if (
                                    stateSnapshotInfo.snapshotID ===
                                    snapshotInfo.snapshotID
                              ) {
                                    add = false;
                              }
                        });
                        if (add) {
                              snapshotsInfoDispatch({
                                    type: "ADD_SNAPSHOT",
                                    snapshotInfo,
                              });
                        }
                  });
                  handleLastEvaluatedKey(getAllResponseData.LastEvaluatedKey);
                  setFetchingNextSnapshots((prev) => {
                        return false;
                  });
                  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
                  // await sleep(500);
            }
      }

      useEffect(() => {
            const filteredSnapshotsD = getVisibleSnapshots(
                  snapshotsInfo,
                  filtersInfo
            );
            setFilteredSnapshotsInfo(filteredSnapshotsD);
            // console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{", filteredSnapshotsD);
      }, [filtersInfo, snapshotsInfo]);

      // useEffect(() => {
      //       console.log(lastEvaluatedKey, !!lastEvaluatedKey);
      // }, [lastEvaluatedKey]);

      return (
            <Container>
                  <br></br>
                  <SnapshotsListFilters />
                  <br></br>

                  <div className="snapshots-heading-box">
                        <Row>
                              <Col className="snapshots-heading-title">
                                    Date
                              </Col>
                              <Col className="snapshots-heading-title">
                                    Show
                              </Col>
                              <Col className="snapshots-heading-title">
                                    Frame
                              </Col>
                              <Col className="snapshots-heading-title">
                                    Status
                              </Col>
                        </Row>
                  </div>
                  <SnapshotsList snapshotsInfo={filteredSnapshotsInfo} />
                  <br></br>
                  {/* <div className="load-more-btn">
                        <Button
                              onClick={getNextSnapshotsFromDB}
                              variant="outline-secondary"
                              disabled={
                                    fetchingNextSnapshots || !lastEvaluatedKey
                              }
                        >
                              Load More Snapshots
                        </Button>
                  </div> */}
                  <br />
                  <InfiniteScroll
                        dataLength={snapshotsInfo.length}
                        next={getNextSnapshotsFromDB}
                        hasMore={!!lastEvaluatedKey}
                        loader={
                              <div className="infinite-loader">
                                    <Spinner
                                          animation="border"
                                          style={{
                                                color: "#2ec4b6",
                                                display: "flex",
                                                justifyContent: "center",
                                          }}
                                    />
                              </div>
                        }
                        endMessage={
                              <div className="end-message">
                                    <h5>Add more snapshots!</h5>
                              </div>
                        }
                  ></InfiniteScroll>
                  <br />
            </Container>
      );
};

export default SnapshotsPage;
