import React, { useContext, useEffect, useState } from "react";
import FiltersInfoContext from "../context/filters-info-context";
import moment from "moment";

import {
      Col,
      Container,
      Dropdown,
      Form,
      FormControl,
      InputGroup,
      Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/SnapshotsListFilters.scss";

import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file

const SnapshotsListFilters = () => {
      const { filtersInfo, filtersInfoDispatch } =
            useContext(FiltersInfoContext);

      const [calendarFocused, setCalendarFocused] = useState(null);
      // const [dateFilter, setDateFilter] = useState([
      //       {
      //             startDate: new Date(),
      //             endDate: new Date(),
      //             key: "selection",
      //       },
      // ]);

      const handleShowFilter = (e) => {
            filtersInfoDispatch({
                  type: "SET_SHOW_FILTER",
                  show: e.target.value,
            });
      };

      // const handleDateFilter = (ranges) => {
      //       // setDateFilter([ranges.selection]);
      //       const s = {
      //             type: "SET_DATE_FILTER",
      //             startDate: ranges == null ? null : ranges[0],
      //             endDate: ranges == null ? null : ranges[1],
      //       };
      //       filtersInfoDispatch(s);
      //       console.log(ranges, s);
      // };

      const handleLikedFilter = (e) => {
            filtersInfoDispatch({
                  type: "SET_LIKED_FILTER",
                  liked: e.target.checked,
            });
      };

      const onFocusChange = (calendarFocused) => {
            setCalendarFocused(calendarFocused);
      };

      const onDatesChange = ({ startDate, endDate }) => {
            filtersInfoDispatch({
                  type: "SET_DATE_FILTER",
                  startDate: startDate,
                  endDate: endDate,
            });
      };

      return (
            <div className="filters-box">
                  <Row>
                        <Col xs={6}>
                              <div className="showfilter">
                                    <InputGroup>
                                          <InputGroup.Text id="showfilter">
                                                Show
                                          </InputGroup.Text>
                                          <FormControl
                                                placeholder="Search"
                                                aria-label="Search"
                                                aria-describedby="showfilter"
                                                onChange={handleShowFilter}
                                                value={filtersInfo.show}
                                                size="lg"
                                          />
                                    </InputGroup>
                              </div>
                        </Col>
                        <Col xs={2}>
                              <div className="likedfilter">
                                    <Form.Check
                                          type="checkbox"
                                          id="likedsnapshots"
                                          label={`Liked Snapshots`}
                                          onClick={handleLikedFilter}
                                          value={filtersInfo.liked}
                                    />
                              </div>
                        </Col>
                        <Col>
                              {/* <div style={{ height: "100px", width: "100px" }}>
                                    <DateRange
                                          moveRangeOnFirstSelection={false}
                                          ranges={dateFilter}
                                          onChange={handleDateSelect}
                                          showMonthAndYearPickers={false}
                                          suffixIcon={null}
                                    />
                              </div> */}
                              <div className="datefilter">
                                    <DateRangePicker
                                          displayFormat={() => "DD/MM/YYYY"}
                                          startDate={filtersInfo.startDate}
                                          endDate={filtersInfo.endDate}
                                          startDateId="mystartdateid"
                                          endDateId="myenddateid"
                                          onDatesChange={onDatesChange}
                                          focusedInput={calendarFocused}
                                          onFocusChange={onFocusChange}
                                          showClearDates={true}
                                          numberOfMonths={1}
                                          isOutsideRange={() => false}
                                    />
                              </div>
                        </Col>
                  </Row>
            </div>
      );
};

export default SnapshotsListFilters;
