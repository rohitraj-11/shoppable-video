import React, { useContext, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import getMoviesData from "../utils/getMoviesData";

import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/RecommendSnapshots.scss";
import RecommendationsInfoContext from "../context/recommendations-info-context";
import MovieCard from "./MovieCard";
import LoadingPage from "./LoadingPage";

export const RecommendSnapsots = () => {
      const { recommendationsInfo, recommendationsInfoDispatch } = useContext(
            RecommendationsInfoContext
      );

      const [itemMetadata, setItemMetadata] = useState(null);
      const [movies, setMovies] = useState([]);

      async function handleMoviesData(moviesD) {
            const moviesDataTMDB = await getMoviesData(moviesD);
            // console.log(moviesDataTMDB);

            setMovies(moviesDataTMDB);
      }

      useEffect(() => {
            var csvFile = require("../assets/item-metadata-celebid-tmdbid.csv");
            const parsedCSV = Papa.parse(csvFile, {
                  complete: function (results) {
                        let map = new Map();
                        results.data.map((result) => {
                              map.set(
                                    result.ITEM_ID,
                                    result.TITLES.split(" | ")
                              );
                        });
                        setItemMetadata(map);
                  },
                  download: true,
                  header: true,
                  skipEmptyLines: true,
            });
      }, []);

      useEffect(() => {
            if (itemMetadata && recommendationsInfo.recommendations.length) {
                  const moviesD = [];
                  recommendationsInfo.recommendations.map((item) => {
                        const movieArray = itemMetadata.get(item.itemId);
                        var random = Math.floor(
                              Math.random() * (movieArray.length + 1)
                        );
                        moviesD.push(movieArray[random]);
                  });
                  handleMoviesData(moviesD);
                  // setMovies(moviesD);
            }
      }, [itemMetadata, recommendationsInfo]);

      // useEffect(() => {
      //       console.log(movies);
      // }, [movies]);
      return (
            <div className="recommendation">
                  <h1>Recommended for you!</h1>
                  {movies.length == 0 ? (
                        <div className="recommendation-box">
                              <h6 className="loading-text">
                                    Brewing movies you may like...
                              </h6>
                        </div>
                  ) : (
                        <div className="recommendation-box">
                              {movies.map((movie) => {
                                    if (movie) {
                                          // console.log(movie);

                                          return (
                                                <MovieCard
                                                      key={`${movie.id}movie`}
                                                      movie={movie}
                                                />
                                          );
                                    }
                              })}
                        </div>
                  )}
            </div>
      );
};

export default RecommendSnapsots;
