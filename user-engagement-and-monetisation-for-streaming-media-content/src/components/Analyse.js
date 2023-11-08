import React, { useState } from "react";
import NewMarkerJS from "./NewMarkerJS";
import NewAnalyseForm from "./NewAnalyseForm";

import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Analyse.scss";

const Analyse = ({ snapshotInfo, snapshotImageData }) => {
      const [allCroppedImageData, setAllCroppedImageData] = useState([]);

      const handleAllCroppedImageData = (allCroppedImageD) => {
            // console.log("++++++++++++++", allCroppedImageD);
            setAllCroppedImageData(() => {
                  return [...allCroppedImageD];
            });
            // allCroppedImageD.forEach(element => {
            //       console.log(element.croppedImageData)
            // });
      };

      return (
            <div className="analyse-box">
                  <br></br>
                  <Row>
                        <Col className="analyse-box-left">
                              <NewMarkerJS
                                    handleAllCroppedImageData={
                                          handleAllCroppedImageData
                                    }
                                    snapshotInfo={snapshotInfo}
                                    snapshotImageData={snapshotImageData}
                              />
                        </Col>
                        <Col className="analyse-box-right">
                              <NewAnalyseForm
                                    allCroppedImageData={allCroppedImageData}
                                    snapshotInfo={snapshotInfo}
                              />
                        </Col>
                  </Row>
                  <br></br>
            </div>
      );
};

export default Analyse;
