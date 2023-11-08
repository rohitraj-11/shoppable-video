import React, { useEffect, useState } from "react";
import Analyse from "./Analyse";
import Celebrities from "./Celebrities";
import Merchandise from "./Merchandise";
import imageToBase64 from "image-to-base64/browser";

import { Container, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/ResultTabs.scss";

const ResultTabs = ({ snapshotInfo, snapshotImageData }) => {
      // const [snapshotImageData, setSnapshotImageData] = useState(null);
      const [tabKey, setTabKey] = useState("");

      // useEffect(() => {
      //       const snapshotImageURL = `${process.env.REACT_APP_CLOUDFRONT_LINK}/private/${userInfo.userIdentityID}/${snapshotInfo.snapshotID}.png`;
      //       imageToBase64(snapshotImageURL).then((response) => {
      //             setSnapshotImageData(`data:image/png;base64,${response}`);
      //       });
      // }, []);

      return (
            <Container>
                  <Tabs
                        id="controlled-tab"
                        activeKey={tabKey}
                        onSelect={(k) => {
                              setTabKey(k);
                        }}
                        className="mb-3"
                  >
                        <Tab eventKey="analyse" key="analyse" title="Analyse">
                              <Analyse
                                    snapshotInfo={snapshotInfo}
                                    snapshotImageData={snapshotImageData}
                              />
                        </Tab>
                        <Tab
                              eventKey="celebrities"
                              key="celebrities"
                              title="Celebrities"
                        >
                              <Celebrities
                                    snapshotInfo={snapshotInfo}
                                    snapshotImageData={snapshotImageData}
                              />
                        </Tab>
                        <Tab
                              eventKey="merchandise"
                              key="merchandise"
                              title="Merchandise"
                        >
                              <Merchandise
                                    snapshotInfo={snapshotInfo}
                                    snapshotImageData={snapshotImageData}
                              />
                        </Tab>
                  </Tabs>
            </Container>
      );
};

export default ResultTabs;
