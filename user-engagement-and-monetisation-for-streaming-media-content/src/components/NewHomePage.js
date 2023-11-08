import React, { useEffect, useState } from "react";
import NewVideoJS from "./NewVideoJS.js";
import RecommendSnapsots from "./RecommendedSnapsots.js";
import VideoTitle from "./VideoTitle.js";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/NewHomePage.scss";

const NewHomePage = () => {
      const [tabKey, setTabKey] = useState("home");
      const [defaultTabs, setDefaultTabs] = useState([
            {
                  tabname: "home",
                  src: "just_go_with_it.mp4",
                  player: null,
                  name: "Just Go With It",
                  info: "A plastic surgeon convinces his assistant to join him along with his young girlfriend on a trip to Hawaii and pose as his ex-wife to cover up a lie, but he ends up complicating the situation further.",
            },
            {
                  tabname: "television",
                  src: "see_you_again.mp4",
                  player: null,
                  name: "See You Again",
                  info: "See You Again is a song by American rapper and singer Wiz Khalifa, featuring American singer-songwriter Charlie Puth. It was commissioned for the soundtrack of the 2015 film Furious 7 as a tribute to actor Paul Walker, who died in a single-vehicle accident on November 30, 2013.",
            },
            {
                  tabname: "movies",
                  src: "Friends_ Couch_Shopping.mp4",
                  player: null,
                  name: "Friends",
                  info: "Follow the lives of six reckless adults living in Manhattan, as they indulge in adventures which make their lives both troublesome and happening.",
            },
            {
                  tabname: "sports",
                  src: "manchester_united.mp4",
                  player: null,
                  name: "Manchester United 3-2 Tottenham",
                  info: "Cristiano Ronaldo scored his first Manchester United hat-trick in 14 years as Tottenham were defeated in a thrilling encounter at Old Trafford. The brilliant Portuguese put United ahead twice before heading home the winner from Alex Telles' corner nine minutes from time, the 807th goal of his career.",
            },
      ]);

      const handlePlayerUpdate = (playerInfo, index) => {
            setDefaultTabs((prevDefaultTabs) => {
                  return prevDefaultTabs.map((element, ind) => {
                        if (ind === index) {
                              return { ...element, player: playerInfo };
                        } else {
                              return element;
                        }
                  });
            });
            playerInfo.pause();
      };

      // useEffect(() => {
      //       console.log(defaultTabs);
      // }, [defaultTabs]);

      const pausePlayers = () => {
            defaultTabs.map((element) => {
                  element.player.pause();
            });
      };

      return (
            <Container className="home-container">
                  <Row>
                        <Col xs={8}>
                              <br></br>
                              <Tabs
                                    id="controlled-tab"
                                    activeKey={tabKey}
                                    onSelect={(k) => {
                                          setTabKey(k);
                                          pausePlayers();
                                    }}
                                    className="mb-3"
                              >
                                    {defaultTabs.map((element, index) => {
                                          return (
                                                <Tab
                                                      eventKey={element.tabname}
                                                      key={element.tabname}
                                                      title={
                                                            element.tabname
                                                                  .charAt(0)
                                                                  .toUpperCase() +
                                                            element.tabname.slice(
                                                                  1
                                                            )
                                                      }
                                                >
                                                      <br></br>
                                                      <div className="row">
                                                            <div className="col-12 main-box-left">
                                                                  <NewVideoJS
                                                                        index={
                                                                              index
                                                                        }
                                                                        onReady={
                                                                              handlePlayerUpdate
                                                                        }
                                                                        videoJSSource={
                                                                              element.src
                                                                        }
                                                                        videoName={
                                                                              element.name
                                                                        }
                                                                  />
                                                                  <VideoTitle
                                                                        name={
                                                                              element.name
                                                                        }
                                                                        info={
                                                                              element.info
                                                                        }
                                                                  />
                                                            </div>
                                                            {/* <div className="col-4 main-box-right">
                                                      <RecommendSnapsots />
                                                </div> */}
                                                      </div>
                                                </Tab>
                                          );
                                    })}
                              </Tabs>
                        </Col>
                        <Col>
                              <div className="main-box-right">
                                    <RecommendSnapsots />
                              </div>
                        </Col>
                  </Row>
            </Container>
      );
};
export default NewHomePage;
