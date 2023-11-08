import React, { useEffect } from "react";
import SnapshotsListItem from "./SnapshotsListItem";

import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/SnapshotsList.scss";

const SnapshotsList = ({ snapshotsInfo }) => {
      return (
            <Accordion>
                  {snapshotsInfo.map((snapshotInfo, index) => {
                        return (
                              <SnapshotsListItem
                                    snapshotInfo={snapshotInfo}
                                    index={index}
                                    key={index}
                              />
                        );
                  })}
            </Accordion>
      );
};

export default SnapshotsList;
