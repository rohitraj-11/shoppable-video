import React, { useEffect, useRef, useState, useContext } from "react";
import SnapshotsInfoContext from "../context/snapshots-info-context";
import UserInfoContext from "../context/user-info-context";

import { toast } from "react-toastify";
import { Buffer } from "buffer";
import moment from "moment";
import { v1 as uuidv1 } from "uuid";
import { API, Storage } from "aws-amplify";

import videojs from "video.js";
import "video.js/dist/video-js.css";

import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/NewVideoJS.scss";
import Paragraph from "antd/lib/skeleton/Paragraph";

export const VideoJS = ({ index, onReady, videoJSSource, videoName }) => {
      const playerRef = useRef(null);
      const videoRef = useRef(null);

      const { snapshotsInfoDispatch } = useContext(SnapshotsInfoContext);
      const { userInfo } = useContext(UserInfoContext);

      const [customFile, setCustomFile] = useState("");
      const [updatedVideoName, setUpdatedVideoName] = useState("");

      const options = {
            aspectRatio: "16:9",
            autoplay: true,
            controls: true,
            fluid: true,
            height: 180,
            isInProcess: false,
            responsive: true,
            sources: [
                  {
                        src: `${process.env.REACT_APP_CLOUDFRONT_LINK}/${videoJSSource}`,
                        type: "video/mp4",
                  },
            ],
            width: 320,
      };

      async function handleCapturedImageData(capturedImageD, videoTime) {
            const snapshotID = uuidv1();
            const buf = Buffer.from(
                  capturedImageD.replace(/^data:image\/\w+;base64,/, ""),
                  "base64"
            );

            await Storage.put(`${snapshotID}.png`, buf, {
                  contentEncoding: "base64",
                  contentType: "image/png",
                  level: "private",
            });

            const snapshotInfo = {
                  snapshotID,
                  annotated: null,
                  celebrities: null,
                  createdAt: moment().toISOString(),
                  liked: false,
                  objects: null,
                  updatedAt: null,
                  videoName: videoName,
                  videoTime: videoTime,
            };
            const putSnapshotInit = {
                  body: {
                        ...snapshotInfo,
                        userIdentityID: userInfo.userIdentityID,
                        routeKey: "PUT /snapshots",
                  },
            };
            const responseData = await API.post(
                  "lookupobjectsapi",
                  "/snapshots",
                  putSnapshotInit
            );
            // console.log("++++++++++++++++++++++++++++", responseData);
            snapshotsInfoDispatch({ type: "ADD_SNAPSHOT", snapshotInfo });
      }

      const handlePlayerReady = (player) => {
            // you can handle player events here
            player.on("waiting", () => {
                  console.log("player is waiting");
            });

            player.on("dispose", () => {
                  console.log("player will dispose");
            });

            player.on("pause", () => {
                  //var modal = player.createModal('dfsjdhj');
                  // When the modal closes, resume playback.
                  // modal.on('modalclose', function() {
                  //   player.play();
                  // });
                  console.log("player is paused");
            });

            player.on("play", () => {
                  console.log("playing");
            });
      };

      ///////////////////////////

      const handleCustomFile = (e) => {
            e.preventDefault();
            setCustomFile(() => e.target.value);
      };

      const handleCustomFilePlay = (e) => {
            e.preventDefault();
            if (customFile !== "") {
                  setUpdatedVideoName(() => customFile);
                  playerRef.current.src({
                        type: "video/mp4",
                        src: `${process.env.REACT_APP_CLOUDFRONT_LINK}/${customFile}`,
                  });
            }
      };

      // async function handleCustomFileUpload(e) {
      //       e.preventDefault();

      //       await Storage.put(`${e.target.files[0].name}`, e.target.files[0], {
      //             contentEncoding: "base64",
      //             contentType: "video/mp4",
      //       });

      //       playerRef.current.src({
      //             type: "video/mp4",
      //             src: `${process.env.REACT_APP_CLOUDFRONT_LINK}/public/${e.target.files[0].name}`,
      //       });

      //       setCustomFile(`${e.target.files[0].name}`);
      // }

      ///////////////////////////////

      useEffect(() => {
            // make sure Video.js player is only initialized once
            if (!playerRef.current) {
                  const videoElement = videoRef.current;
                  if (!videoElement) return;

                  const player = (playerRef.current = videojs(
                        videoElement,
                        options,
                        () => {
                              // console.log("Player is ready from VideoJS");
                              onReady && onReady(player, index);
                        }
                  ));

                  const videoJsButtonClass = videojs.getComponent("Button");
                  const concreteButtonClass = videojs.extend(
                        videoJsButtonClass,
                        {
                              // The `init()` method will also work for constructor logic here, but it is deprecated. If you provide an `init()` method, it will override the `constructor()` method!
                              constructor: function () {
                                    videoJsButtonClass.call(this, player);
                              },
                              handleClick: function () {
                                    if (player.isFullscreen_) {
                                          var modal_content =
                                                '<div className="player-modal" style="align-items:center;display:flex;font-family:serif;height:80vh;justify-content:center;text-align:center;;"><h2 style=color:#abc4ff;>📷 Snapshot captured!</h2></div>';
                                          var contentEl =
                                                document.createElement("div");
                                          contentEl.innerHTML = modal_content;

                                          var modal =
                                                player.createModal(contentEl);
                                          modal.on("modalclose", function () {
                                                player.play();
                                          });
                                          setTimeout(function () {
                                                modal.close();
                                          }, 500);
                                    } else {
                                          toast.success(
                                                "📷 Snapshot captured!",
                                                {}
                                          );
                                    }
                                    player.pause();
                                    const canvas =
                                          document.createElement("canvas");
                                    const context = canvas.getContext("2d");
                                    const video = videoRef.current;

                                    canvas.width = player.currentWidth() * 3;
                                    canvas.height = player.currentHeight() * 3;
                                    context.imageSmoothingQuality = "high";
                                    context.drawImage(
                                          video,
                                          0,
                                          0,
                                          canvas.width,
                                          canvas.height
                                    );
                                    const capturedImageD = canvas.toDataURL(
                                          "image/png",
                                          1
                                    );
                                    player.play();
                                    handleCapturedImageData(
                                          capturedImageD,
                                          player.currentTime()
                                    );
                              },
                        }
                  );
                  // var concreteButtonInstance = player.controlBar.addChild(new concreteButtonClass());
                  videojs.registerComponent(
                        "concreteButtonClass",
                        concreteButtonClass
                  );
                  const concreteButtonInstance = player
                        .getChild("controlBar")
                        .addChild("concreteButtonClass", {}, 9);
                  concreteButtonInstance.addClass(
                        "vjs-icon-circle-inner-circle"
                  );
                  concreteButtonInstance.addClass("vjs-my-capture-button");
            } else {
                  // you can update player here [update player through props]
                  // const player = playerRef.current;
                  // player.autoplay(options.autoplay);
                  // player.src(options.sources);
            }
      }, [options, videoRef]);

      // Dispose the Video.js player when the functional component unmounts
      useEffect(() => {
            const player = playerRef.current;

            return () => {
                  if (player) {
                        player.dispose();
                        playerRef.current = null;
                  }
            };
      }, [playerRef]);

      return (
            <Container>
                  <div className="player-border" id={`${videoName}`}>
                        <div data-vjs-player>
                              <video
                                    className="video-js vjs-big-play-centered"
                                    crossOrigin=""
                                    ref={videoRef}
                              />
                        </div>
                  </div>
                  <br></br>
                  <Form>
                        {/* <div className="custom-video-box">
                              <p>Play Custom Video:</p>
                              <input
                                    type="file"
                                    name="file"
                                    onChange={handleCustomFileUpload}
                              ></input>
                        </div> */}
                        <Row>
                              <Col xs={9}>
                                    <Form.Group className="mb-3">
                                          <Form.Control
                                                placeholder="myvideo.mp4"
                                                onChange={handleCustomFile}
                                                size="sm"
                                          />
                                    </Form.Group>
                              </Col>
                              <Col xs={3}>
                                    <Button
                                          size="sm"
                                          variant="outline-secondary"
                                          type="submit"
                                          onClick={handleCustomFilePlay}
                                    >
                                          Play Custom Video
                                    </Button>
                              </Col>
                        </Row>
                  </Form>
            </Container>
      );
};

export default VideoJS;
