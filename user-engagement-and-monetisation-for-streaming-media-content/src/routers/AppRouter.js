import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import NewHomePage from "../components/NewHomePage";
import NotFoundPage from "../components/NotFoundPage";
import SnapshotsPage from "../components/SnapshotsPage";
import LoadingPage from "../components/LoadingPage";

import { API, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import snapshotsInfoReducer from "../reducers/snapshotsInfo";
import SnapshotsInfoContext from "../context/snapshots-info-context";
import userInfoReducer from "../reducers/userInfo";
import UserInfoContext from "../context/user-info-context";
import filtersInfoReducer from "../reducers/filtersInfo";
import FiltersInfoContext from "../context/filters-info-context";
import recommendationsInfoReducer from "../reducers/recommendationsInfo";
import RecommendationsInfoContext from "../context/recommendations-info-context";

import moment from "moment";

import "../styles/AppRouter.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = ({ signOut, user }) => {
      const [snapshotsInfo, snapshotsInfoDispatch] = useReducer(
            snapshotsInfoReducer,
            []
      );
      const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, {
            userIdentityID: null,
      });
      const [filtersInfo, filtersInfoDispatch] = useReducer(
            filtersInfoReducer,
            {
                  endDate: moment().endOf("month"),
                  liked: false,
                  show: "",
                  startDate: moment().startOf("month"),
            }
      );
      const [recommendationsInfo, recommendationsInfoDispatch] = useReducer(
            recommendationsInfoReducer,
            {
                  recommendations: [],
                  recommendationID: "",
            }
      );

      const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

      async function getUserCredentialsAndInitialSnapshots() {
            const userCurrentCredentials = await Auth.currentCredentials();
            // console.log(userCurrentCredentials);

            const userIdentityID = userCurrentCredentials.identityId;
            // const userSessionID = userCurrentCredentials.sessionToken; //
            userInfoDispatch({ type: "SET_USER_IDENTITY_ID", userIdentityID });

            const getAllSnapshotInit = {
                  body: {
                        userIdentityID: userIdentityID,
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
            setLastEvaluatedKey(() => {
                  return getAllResponseData.LastEvaluatedKey;
            });

            //////////////////////////////////////////////////

            const recommendationsInit = {
                  body: {
                        itemID: "nm0000226",
                        userID: `${userIdentityID}`,
                        count: 5,
                  },
            };

            const recommendationsData = await API.post(
                  "lookupobjectsapi",
                  "/recommendationscelebid",
                  recommendationsInit
            );
            recommendationsInfoDispatch({
                  type: "SET_RECOMMENDATIONS_INFO",
                  recommendations: recommendationsData[0].itemList,
                  recommendationID: recommendationsData[0].recommendationId,
            });
            // console.log("recommendations", recommendationsData);

            /////////////////////////////////////////////////

            /////////////////////////////////////////////////
      }

      const handleLastEvaluatedKey = (updatedLastEvaluatedKey) => {
            setLastEvaluatedKey(() => {
                  return updatedLastEvaluatedKey;
            });
      };

      useEffect(() => {
            getUserCredentialsAndInitialSnapshots();
      }, []);

      // useEffect(() => {
      //       console.log(lastEvaluatedKey);
      // }, [lastEvaluatedKey]);

      return (
            <>
                  <Router>
                        <div className="app">
                              <Header signOut={signOut} />
                              {userInfo.userIdentityID ? (
                                    <RecommendationsInfoContext.Provider
                                          value={{
                                                recommendationsInfo,
                                                recommendationsInfoDispatch,
                                          }}
                                    >
                                          <FiltersInfoContext.Provider
                                                value={{
                                                      filtersInfo,
                                                      filtersInfoDispatch,
                                                }}
                                          >
                                                <UserInfoContext.Provider
                                                      value={{
                                                            userInfo,
                                                            userInfoDispatch,
                                                      }}
                                                >
                                                      <SnapshotsInfoContext.Provider
                                                            value={{
                                                                  snapshotsInfo,
                                                                  snapshotsInfoDispatch,
                                                            }}
                                                      >
                                                            <Routes>
                                                                  <Route
                                                                        path="/"
                                                                        element={
                                                                              <NewHomePage />
                                                                        }
                                                                  />
                                                                  <Route
                                                                        exact
                                                                        path="/snapshots"
                                                                        element={
                                                                              <SnapshotsPage
                                                                                    lastEvaluatedKey={
                                                                                          lastEvaluatedKey
                                                                                    }
                                                                                    handleLastEvaluatedKey={
                                                                                          handleLastEvaluatedKey
                                                                                    }
                                                                              />
                                                                        }
                                                                  />
                                                                  <Route
                                                                        element={
                                                                              <NotFoundPage />
                                                                        }
                                                                  />
                                                            </Routes>
                                                      </SnapshotsInfoContext.Provider>
                                                </UserInfoContext.Provider>
                                          </FiltersInfoContext.Provider>
                                    </RecommendationsInfoContext.Provider>
                              ) : (
                                    <LoadingPage />
                              )}
                              <ToastContainer
                                    autoClose={2000}
                                    position="top-center"
                                    hideProgressBar={false}
                                    closeOnClick={true}
                                    pauseOnHover={false}
                                    draggable={true}
                                    progress={undefined}
                              />
                        </div>
                  </Router>
            </>
      );
};

export default withAuthenticator(AppRouter);
