import React, { useEffect, useState } from "react";

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { PlayCircleFilled } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/MovieCard.scss";

const MovieCard = ({ movie }) => {
      // useEffect(() => {
      //       console.log(movie.poster_path);
      // });
      return (
            <div className="movie-box">
                  <div className="moviecard">
                        {/* <Card style={{ width: "300px", height: "280px" }}>
                        <Card.Img
                        className="imgBx2 img-fluid mx-auto movieimg"
                        variant="top"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={`${movie.original_title}`}
                        />
                        <Card.Title className="cardtitle">
                        {movie.original_title}
                        </Card.Title>
                        <ListGroup className="list-group-flush cardbuttons">
                        <ListGroupItem>
                        <>
                        <Button
                        className="card-btn-modal"
                        size="sm"
                        variant="outline-secondary"
                        >
                        Watch
                                          </Button>
                                    </>
                                    </ListGroupItem>
                                    </ListGroup>
                              </Card> */}
                        <img
                              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                              className="img-fluid movieimg"
                              alt={`${movie.original_title}`}
                        />
                        <div className="moviedetails">
                              <h5>{movie.original_title}</h5>
                              <h6>{movie.overview.substring(0, 150)}...</h6>
                              <span>{`${movie.runtime} mins - `}</span>
                              {movie.genres.map((genre, index) => {
                                    return (
                                          <span key={index}>
                                                <span>{index ? ", " : ""}</span>
                                                <span>{`${genre.name}`}</span>
                                          </span>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
};

export default MovieCard;
