import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Nav, Navbar, Badge } from "react-bootstrap";

import {
      AppstoreOutlined,
      CoffeeOutlined,
      LogoutOutlined,
      UserOutlined,
} from "@ant-design/icons";

import "../styles/Header.scss";

const Header = ({ signOut }) => {
      return (
            <Navbar
                  bg="myCol"
                  variant="dark"
                  sticky="top"
                  expand="sm"
                  collapseOnSelect
            >
                  <Container>
                        <Navbar.Brand as={Link} to="/">
                              <Badge bg="myCol">
                                    <AppstoreOutlined
                                          style={{
                                                fontSize: "16px",
                                                color: "#2196f3",
                                                display: "flex",
                                          }}
                                    />
                              </Badge>
                              ShoppableVideo
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                              <Nav className="me-auto">
                                    {/* <Nav.Link as={Link} to="/snapshots">
                                          Review Snapshots
                                          <Badge bg="light">
                                                <CoffeeOutlined style={{ fontSize: '13px', color: '#2196f3', display: 'flex' }} />
                                          </Badge>
                                    </Nav.Link> */}
                              </Nav>
                              <Nav>
                                    {/* <Nav.Link>
                                          {'User'}
                                          <Badge bg="light">
                                                <UserOutlined style={{ fontSize: '13px', color: '#2196f3', display: 'flex' }} />
                                          </Badge>
                                    </Nav.Link> */}
                                    <Nav.Link as={Link} to="/snapshots">
                                          Review Snapshots
                                          <Badge bg="myCol">
                                                <CoffeeOutlined
                                                      style={{
                                                            fontSize: "13px",
                                                            color: "#2196f3",
                                                            display: "flex",
                                                      }}
                                                />
                                          </Badge>
                                    </Nav.Link>
                                    <Nav.Link onClick={signOut}>
                                          Logout
                                          <Badge bg="myCol">
                                                <LogoutOutlined
                                                      style={{
                                                            fontSize: "13px",
                                                            color: "#2196f3",
                                                            display: "flex",
                                                      }}
                                                />
                                          </Badge>
                                    </Nav.Link>
                              </Nav>
                        </Navbar.Collapse>
                  </Container>
            </Navbar>
      );
};

export default Header;
