import { useParams, BrowserRouter, Navigate, Route, Routes, useNavigate, Link, Outlet, createPath } from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import * as API from './Utilities.js'

const hostname = "18.210.46.64";

function EventDetails(props) {
  // venue
  let { vName } = useParams();
  let venueid = vName;
  let venue;

  const venue_list = JSON.parse(window.sessionStorage.venueList)

  for (let e of venue_list) {
    if (e.venueid == venueid)
      venue = e
  }

  console.log(venue)

  // events
  const [event_list, setEventList] = useState([])

  useEffect(() => {
    let events = []
    let count = 0;
    for (let e of venue.events) {
      if (count > 3) break;
      API.getEvent(e)
        .then((res) => {
          if (res.err)
            console.log(res.err)
          else
            events.push(res)
        })
      count += 1;
    }
    setEventList(events);
  }, [])

  console.log(event_list)
  // comments
  const [comment, setComment] = useState("");
  const [comment_list, setCommentList] = useState([]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  let user = window.sessionStorage.uname

  const handleSubmit = (e) => {
    e.preventDefault();
    let req = {
      username: user,
      body: comment,
      date: today,
    }
    console.log(req)
    setCommentList((comment_list) => [...comment_list, req])
    API.updateComment(venueid, req).then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    API.getCommentList(venueid)
      .then((res) => {
        if (res.err) {
          console.log(res.err)
          setCommentList([]);
        }
        else
          setCommentList(res.comments);
      })
  }, [])

  return (
    <div>
      <div className="my-3">
        <div className="card">
          <div className="card-body p-4">
            {/* {props.sideIndex}  */}
            <h2>{venue.venuee}</h2>
            <p>Location: {venue.latitude}, {venue.longitude}</p>
          </div>
        </div>
      </div>

      <div className="my-3">
        <div id="accordion">

          {event_list.map((event) => (
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  {event.titlee}
                </h5>
                <p className="mb-0">{event.presenterorge}</p>
              </div>

              {event.desce ? (
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                  <div className="card-body">{event.desce}</div>
                </div>
              ) : (
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                  <div className="card-body">No description</div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      <div className="my-3">
        <div className="card">

          {comment_list.map((comment) => (
            <div>
              <div className="card-body p-4">
                <div className="d-flex flex-start">
                  <div className="row">
                    <div className="d-flex mb-1">
                      <p className="fw-bold m-0">{comment.username}</p>
                      <p className="m-0 ms-1"> on {comment.date.slice(0, 10)} </p>
                    </div>
                    <div className="d-flex">
                      <p className="m-0">{comment.body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-0" />
            </div>
          ))}

        </div>

        <form className="form-control" onSubmit={handleSubmit}>
          <div className="row no-gutters">
            <div className="col-10">
              <input
                className="form-control"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );


}
export default EventDetails;