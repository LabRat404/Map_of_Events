import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';
import fetchAllData from '../hooks/Fetch.js'
import * as API from './Utilities.js'

let user;
let venues = [{
  venueid: "0",
  venuee: "Loading",
  latitude: "0",
  longitude: "0",
  events: []
}];
let sortedVenues = [];
let favLists = venues;
const hostname = "18.210.46.64";

function Dashboard() {
  const [userName, setUserName] = useState();
  const [clickedFav, setClickedFav] = useState(false);
  const [search, setSearch] = useState("");
  const [realV, updateV] = useState([]);
  const [clickedLink, updateClickedLink] = useState(false);

  const [venueList, setVenuList] = useState([]);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('not defined');

  // fetch and update events; retrieve last updated timestamp
  useEffect(() => {
    fetchAllData()
      .then((timestamp) => {
        setLastUpdatedTime(timestamp);
        document.getElementById("lastUpdatedTime").innerText = timestamp;
      })
  }, [])

  console.log('lastUpdatedTime:', lastUpdatedTime)

  //get user name
  useEffect(() => {
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };

    let token = window.localStorage.getItem('token');
    // console.log(token);
    let decodedToken = parseJwt(token);
    // console.log(decodedToken);
    setUserName(decodedToken.username);
    let user = userName;
    window.sessionStorage.setItem('uname', user);
    
    // console.log(user);
    // window.localStorage.removeItem('user2');
    if (userName != undefined) {
      let userFavList = window.localStorage.getItem(userName);
      if (userFavList == null) { //no such user
        // console.log("new user, empty fav list");
        window.localStorage.setItem(userName, JSON.stringify([]));
        // window.localStorage.removeItem('testuser');
        // console.log(favLists);
      }
      else {//hv records
        favLists = JSON.parse(userFavList);
        // console.log(favLists.length);
        // console.log(favLists);
        // console.log("old user, hv list");
      }
    }
  }, [userName, realV]);

  // get venues
  useEffect(() => {
    // if (!"venueList" in window.sessionStorage)
    API.getAllVenues()
      .then((res) => {
        setVenuList(res);
        venues = res;
        console.log(res)
        window.sessionStorage.setItem("venueList", JSON.stringify(res));
      })
  }, []);

  function logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    window.location.href = '/';
  }

  function showFav() {
    setClickedFav(!clickedFav);
    updateClickedLink(false);
  }
  function backToList() {
    updateClickedLink(false);
  }

  return (
    <>
      <header>
        <div className="d-flex align-items-center bg-info mb-3">
          <div id="userName" className="p-2"><b>{userName}</b></div>
          <div className="ms-auto p-2"><button id="logoutBtn" onClick={() => logout()} type="submit" className="btn btn-primary"><i className="bi bi-person"> </i>Logout</button></div>
        </div>
      </header>

      <div className="mb-3  d-flex flex-row justify-content-center align-items-center">
        <div className="p-2">
          <Link to="/Dashboard">
            <button id="showFavBtn" onClick={() => backToList()} className="btn btn-primary" type="submit">Back</button>
          </Link>
        </div>

        <div className="p-2">
          <i className="bi bi-search"> <input id="searchText" onInput={() => setSearch(document.getElementById("searchText").value)} type="text" placeholder="Search for locations"></input>
          </i>
        </div>

        <div className="p-2">
          <button id="showFavBtn" onClick={() => showFav()} className="btn btn-primary" type="submit">Show favorite locations</button>
        </div>
      </div>

      {/* middle main content */}
      {/* <Outlet /> */}
      {!clickedFav && <Tablelist content={search} clickedLink={clickedLink} updateClickedLink={updateClickedLink} />}
      {clickedFav && <Favourite content={search} clickedLink={clickedLink} updateClickedLink={updateClickedLink} />}
      {/* <Container clickedFav = {clickedFav}/> */}

      <footer className="bg-purple">
        <i className="bi bi-clock"> </i>Last updated on <span id="lastUpdatedTime">undefined</span>
      </footer>
    </>
  );
}

function Favourite(props) {
  const [sort, updateSort] = useState(false);
  const [choosedVenues, updateChoosedVenues] = useState(venues[0]); // selected venues from list, default = 1st venue
  const [venuesIndex, updateVenuesIndex] = useState(0); // selected venues index from list
  const [mod2, setmod2] = useState(1)

  //function pass to child to update selected venues
  function selectedVenues(index, v) {
    // console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }


  function sortEvent(mod1) {
    // console.log(sort);
    let list2 = JSON.parse(JSON.stringify(favLists));
    list2.sort((a, b) => a.events.length - b.events.length);

    if (mod1 == 2) {
      return list2.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <ViewFavList clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : <></>);
    }
    else if (mod1 == 1) {
      return favLists.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <ViewFavList clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : < div key={index}></div>);
    }
    else if (mod1 == 3) {
      list2.sort((a, b) => b.events.length - a.events.length);
      return list2.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <ViewFavList clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : <></>)
    }
  }

  return (
    <div className="container ">
      <main>
        <div className="d-flex flex-row row mb-3">
          {!props.clickedLink &&
            <div id="favList" className="border">
              <div className="d-flex justify-content-center align-items-center bg-secondary">
                <div className="p-2"></div>
                <div className="p-2">Favourite Venues</div>
                <div className="p-2"><button onClick={() => setmod2(mod2 == 3 ? 1 : mod2 + 1)} type="submit" className="btn btn-primary"><i className="bi bi-sort-down"></i></button></div>
              </div>
              <div id="tableList" className="list-group mb-3">
                {sortEvent(mod2)}
              </div>
            </div>}
          {props.clickedLink && <div id="details" className=" list-group mb-3">
            <Outlet />
          </div>}
        </div>
      </main>
    </div>
  );
}

// User action 1
function Tablelist(props) {
  const [sort, updateSort] = useState(false);
  const [choosedVenues, updateChoosedVenues] = useState(venues[0]); // selected venues from list, default = 1st venue
  const [venuesIndex, updateVenuesIndex] = useState(0); // selected venues index from list
  const [mod, setMod] = useState(1);
  //function pass to child to update selected venues
  function selectedVenues(index, v) {
    // console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }

  function sortEvent(mod1) {
    // console.log(sort);
    // let tmp = [];
    // let tmp2 = []; 
    // for (let i = 0; i < venues.length; i++){
    //   tmp.push(venues.events.length);
    //   tmp2.push(venues.events.length);
    // }
    // tmp.sort();
    // let ind = [];
    // for (let i = 0; i < venues.length; i++){
    //   ind.push(tmp2.indexOf[tmp[i]]);
    // }

    let venues2 = JSON.parse(JSON.stringify(venues));
    venues2.sort((a, b) => a.events.length - b.events.length);

    if (mod1 == 3) {
      venues2.sort((a, b) => b.events.length - a.events.length);
      return venues2.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : <div key={index}></div>);
    }

    if (mod1 == 2) { // low to high
      return venues2.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : <div key={index}></div>);
    }
    if (mod1 == 1) {
      return venues.map((obj, index) => obj.venuee.toLowerCase().includes(props.content.toLowerCase()) ?
        <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i={index} key={index} selectedVenues={selectedVenues} /> : <div key={index}></div>);
    }

  }

  return (
    <div className="container border">
      <main>
        <div id="mainContent" className="d-flex flex-row row mb-3">

          {!props.clickedLink && <div id="table" className="">
            <div className="d-flex justify-content-between align-items-center bg-secondary">
              <div className="p-2"></div>
              <div className="p-2">Venues</div>
              <div id="sorting" className="p-2"><button onClick={() => { setMod(mod == 3 ? 1 : mod + 1) }} type="submit" className="btn btn-primary"><i className="bi bi-sort-down"></i></button></div>
              {/* updateSort(!sort);  */}
            </div>
            <div id="tableList" className="list-group mb-3">
              {sortEvent(mod)}
            </div>
          </div>}
          {props.clickedLink && <div id="sideContent" className="">
            <Outlet />
          </div>}

        </div>
      </main>
    </div>
  );
}

function List(props) {
  const [favorite, updateFavorite] = useState(false);
  let i = props.i; //index
  let venuesObj = props.venuesObj;
  let name = props.venuesObj.venuee;
  let venueid = props.venuesObj.venueid;
  let quota = props.venuesObj.events.length;
  // console.log(name);

  // clicked link
  function handleClick(e) {
    // console.log("selected " + name)
    // props.selectedVenues(i, venuesObj); //update parent Tablelist selectedVenues
    props.updateClickedLink(!props.clickedLink);
  }

  //added to favourite
  function addFav() {
    updateFavorite(!favorite);

    let objIndexInFavList = favLists.map(e => e.venuee).indexOf(venuesObj.venuee);
    // console.log(objIndexInFavList);
    // console.log(favLists);
    if (objIndexInFavList == -1) { //no such venue in fav lists
      favLists.push(venuesObj);
      // console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store

    }
    else { //hv venue, delete it
      favLists.splice(objIndexInFavList, 1);
      // console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
    }
  }

  return (
    <div className='d-flex flex-row align-items-center'>
      <div className="list-group-item list-group-item-action p-4 border-bottom border-dark">
        <div onClick={(e) => handleClick(e)}>
          <Link to={`${venueid}`} style={{ textDecoration: 'none', color: "black" }}>
            <div><i className="bi bi-geo-alt"> </i>{name}</div>
            <div><i className="bi bi-calendar-event"> </i>{quota + " events"}</div>
          </Link>
        </div>
      </div>
      {/* fav icon star */}
      <div onClick={() => addFav()} className='ms-auto p-2'>
        <div className='btn'>
          <i className="bi bi-plus-square-fill" style={{ color: "black" }}></i>
        </div>
      </div>
    </div>
  );
}

function ViewFavList(props) {
  const [favorite, updateFavorite] = useState(true);
  let i = props.i; //index
  let venuesObj = props.venuesObj;
  let name = props.venuesObj.venuee;
  let venueid = props.venuesObj.venueid;
  let quota = props.venuesObj.events.length;
  // console.log(name);

  // clicked link
  function handleClick(e) {
    // console.log("selected " + name)
    // props.selectedVenues(i, venuesObj); //update parent Tablelist selectedVenues
    props.updateClickedLink(!props.clickedLink);
  }

  //added to favourite
  function addFav() {
    updateFavorite(!favorite);

    let objIndexInFavList = favLists.map(e => e.venuee).indexOf(venuesObj.venuee);
    // console.log(objIndexInFavList);
    // console.log(favLists);
    if (objIndexInFavList == -1) { //no such venue in fav lists
      favLists.push(venuesObj);
      // console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store

    }
    else { //hv venue, delete it
      favLists.splice(objIndexInFavList, 1);
      // console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
    }
  }

  return (
    <div>
      {favorite && <div className='d-flex flex-row align-items-center'>
        <div className="list-group-item list-group-item-action p-4 border-bottom border-dark">
          <div onClick={(e) => handleClick(e)}>
            <Link to={`${venueid}`} style={{ textDecoration: 'none', color: "black" }}>
              <div><i className="bi bi-geo-alt"> </i>{name}</div>
              <div><i className="bi bi-calendar-event"> </i>{quota + " events"}</div>
            </Link>
          </div>
        </div>
        {/* fav icon star */}
        <div onClick={() => addFav()} className='ms-auto p-2'>
          <div className='btn'>
            <i className="bi bi-dash-square-fill" style={{ color: "black" }}></i>
          </div>
        </div>
      </div>} </div>
  );
}

export default Dashboard;