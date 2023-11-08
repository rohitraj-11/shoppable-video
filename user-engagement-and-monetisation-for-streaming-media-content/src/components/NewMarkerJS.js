import React, { useContext, useEffect, useRef, useState } from "react";
import getAllCroppedImageData from "../utils/getAllcroppedImageData";
import * as markerjs2 from "markerjs2";
import { v1 as uuidv1 } from "uuid";
import SnapshotsInfoContext from "../context/snapshots-info-context";

import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/NewMarkerJS.scss";

const NewMarkerJS = ({
      handleAllCroppedImageData,
      snapshotInfo,
      snapshotImageData,
}) => {
      const { snapshotsInfoDispatch } = useContext(SnapshotsInfoContext);

      // const [capturedImageData, setCapturedImageData] = useState(null);
      const [markerJSImageElement, setMarkerJSImageElement] = useState(null);
      const [markerInfo, setMarkerInfo] = useState([]);
      const [snapshotImageElement, setSnapshotImageElement] = useState(null);

      const showingMarkerArea = useRef(null);

      function removeMarkerInfo(coordinatesData) {
            setMarkerInfo((prevMarkerInfo) => {
                  const filteredMarkerInfo = prevMarkerInfo.filter(
                        (data) => coordinatesData.id !== data.id
                  );
                  return [...filteredMarkerInfo];
            });
      }

      function showMarkerArea(target) {
            showingMarkerArea.current = true;
            const markerArea = new markerjs2.MarkerArea(target);
            markerArea.settings.displayMode = "inline";
            markerArea.availableMarkerTypes = ["FrameMarker"];
            markerArea.settings.defaultStrokeWidth = "2";
            markerArea.settings.defaultStrokeDasharray = "3";
            markerArea.uiStyleSettings.undoButtonVisible = false;
            markerArea.blur();

            markerArea.addEventListener("render", (event) => {
                  //-------------------handleMarkedImageData(event.dataUrl);
                  return (target.src = event.dataUrl);
            });

            markerArea.addEventListener("markercreate", (event) => {
                  handleAllCroppedImageData([]);
                  event.marker.notes = uuidv1();
            });

            markerArea.addEventListener("markerdeselect", (event) => {
                  // console.table('Edited ',event.marker.notes, event.marker.left)
                  const coordinatesData = {
                        id: event.marker.notes,
                        left: event.marker.left,
                        top: event.marker.top,
                        width: event.marker.width,
                        height: event.marker.height,
                  };
                  updateMarkerInfo(coordinatesData);
            });

            markerArea.addEventListener("markerdelete", (event) => {
                  // console.table('Deleted ',event.marker.notes)
                  const coordinatesData = {
                        id: event.marker.notes,
                        left: event.marker.left,
                        top: event.marker.top,
                        width: event.marker.width,
                        height: event.marker.height,
                  };
                  removeMarkerInfo(coordinatesData);
            });

            markerArea.addEventListener("beforeclose", (event) => {
                  // eslint-disable-next-line no-restricted-globals
                  if (!confirm("Do you want to reset the snapshot?")) {
                        event.preventDefault();
                  }
                  setMarkerInfo([]);
                  //--------handleMarkedImageData(null);
                  target.src = snapshotImageData;
                  setupMarkerJS();
            });
            markerArea.show();
      }

      // function setupMarkerJS() {
      //       const allCroppedImageD = getAllCroppedImageData(
      //             markerInfo,
      //             markerJSImageElement
      //       );
      //       handleAllCroppedImageData(allCroppedImageD);
      //       console.log(
      //             "annotated length",
      //             markerInfo.length,
      //             allCroppedImageD.length
      //       );
      //       document.getElementById("toolbar-br").scrollIntoView();
      //       const markerJSImageE =
      //             document.getElementById("markerjs-edit-area");
      //       setMarkerJSImageElement(markerJSImageE);
      //       const markerJSGetToolbarE =
      //             document.getElementById("get-toolbar-anchor");
      //       showingMarkerArea.current = false;
      //       markerJSGetToolbarE.addEventListener("click", () => {
      //             if (!showingMarkerArea.current) {
      //                   showMarkerArea(markerJSImageE);
      //             }
      //       });
      // }

      function updateMarkerInfo(coordinatesData) {
            if (!!coordinatesData.id) {
                  setMarkerInfo((prevMarkerInfo) => {
                        const filteredMarkerInfo = prevMarkerInfo.filter(
                              (data) => coordinatesData.id !== data.id
                        );
                        return [...filteredMarkerInfo, coordinatesData];
                  });
            }
      }

      async function handleSnapshotImageElement() {
            const snapshotImageE = document.createElement("img");
            snapshotImageE.src = snapshotImageData;
            await snapshotImageE.decode();
            setSnapshotImageElement(snapshotImageE);
      }

      function setupMarkerJS() {
            if (!snapshotImageElement) {
                  handleSnapshotImageElement();
            }
            if (markerInfo.length) {
                  const allCroppedImageD = getAllCroppedImageData(
                        markerInfo,
                        markerJSImageElement,
                        snapshotImageElement
                  );
                  handleAllCroppedImageData(allCroppedImageD);
                  // allCroppedImageD.forEach((ele) => {
                  //       console.log(ele.croppedImageData);
                  // });
                  console.log(
                        "annotated length",
                        markerInfo,
                        allCroppedImageD.length
                  );
            }
            const markerJSImageE = document.getElementById(
                  `markerjs-edit-area-${snapshotInfo.snapshotID}`
            );
            if (!markerJSImageElement) {
                  setMarkerJSImageElement(markerJSImageE);
            }
            const markerJSGetToolbarE = document.getElementById(
                  `get-toolbar-anchor-${snapshotInfo.snapshotID}`
            );
            showingMarkerArea.current = false;
            markerJSGetToolbarE.addEventListener("click", () => {
                  if (!showingMarkerArea.current) {
                        showMarkerArea(markerJSImageE);
                  }
            });
      }

      // useEffect(() => {
      //       const snapshotImageURL = `${process.env.REACT_APP_CLOUDFRONT_LINK}/private/${userInfo.userIdentityID}/${snapshotInfo.snapshotID}.png`;
      //       imageToBase64(snapshotImageURL) // Image URL
      //             .then((response) => {
      //                   setCapturedImageData(() => {
      //                         return `data:image/png;base64,${response}`;
      //                   });
      //             });
      // }, []);

      return (
            <Container>
                  <div className="markerjs-box">
                        <div className="d-grid gap-2">
                              <Button
                                    className="get-toolbar-btn"
                                    id={`get-toolbar-btn-${snapshotInfo.snapshotID}`}
                                    variant="dark"
                              >
                                    <a
                                          className="get-toolbar-anchor"
                                          id={`get-toolbar-anchor-${snapshotInfo.snapshotID}`}
                                    >
                                          Annotate
                                    </a>
                              </Button>
                        </div>
                        <br></br>
                        <img
                              alt="Snapshot-MarkerJS"
                              className="markerjs-edit-img img-fluid"
                              id={`markerjs-edit-area-${snapshotInfo.snapshotID}`}
                              onLoad={setupMarkerJS}
                              src={snapshotImageData}
                        ></img>
                  </div>
            </Container>
      );
};

export default NewMarkerJS;
