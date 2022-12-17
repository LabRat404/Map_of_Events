import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';
import fetchEvents from '../hooks/Fetch.js';
import * as util from './Utilities';

let user;
let venues = [{ venuesName: "Sha Tin Town Hall (Lecture Room 2)", quota: 36 },
{ venuesName: "Sha Tin Town Hall (Conference Room)", quota: 40 },
{ venuesName: "Sha Tin Town Hall (Lecture Room 1)", quota: 32 },
{ venuesName: "Sheung Wan Civic Centre (Lecture Hall)", quota: 26 },
{ venuesName: "Hong Kong Central Library", quota: 29 },
{ venuesName: "Sha Tin Town Hall (Dance Studio)", quota: 28 },
{ venuesName: "Tuen Mun Town Hall (Dance Studio)", quota: 25 },
{ venuesName: "Yuen Long Theatre (Dance Studio)", quota: 20 },
{ venuesName: "North District Town Hall (Function Room 1)", quota: 19 },
{ venuesName: "Sha Tin Town Hall (Music Studio)", quota: 34 }
];
let sortedVenues = [];
let favLists = [];

function Dashboard() {
  const [userName, setUserName] = useState();
  const [clickedFav, setClickedFav] = useState(false);
  const [search, setSearch] = useState("");

  // let [lastUpdatedTime, fetchEvents] = useState(0);

  // // fetch and update events; retrieve last updated timestamp
  // useEffect(() => {
  //   lastUpdatedTime = fetchEvents()
  // }, [])

  // console.log(lastUpdatedTime);
  
  const [realV, updateV] = useState([]);
  const [clickedLink, updateClickedLink] = useState(false);

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
    user = userName;
    // console.log(user);
    // window.localStorage.removeItem('user2');
    if (userName != undefined) {
      let userFavList = window.localStorage.getItem(userName);
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
    let currentTime = new Date();
    let str = "";
    str += currentTime.toLocaleDateString();
    str += " ";
    str += currentTime.getHours() + ":";
    str += currentTime.getMinutes() + ":";
    str += currentTime.getSeconds();
    // console.log(currentTime.toLocaleDateString());
    document.getElementById("lastUpdatedTime").innerText = str;

    fetchData();
  }, [userName,realV]);

  function fetchData(){
    const hostname = "localhost";
    fetch("http://"+hostname+":3001/getAllVenues", {
      method: "GET",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      }
    }).then(res => res.json())
    .then(
      realVenues =>{
        // updateV(realVenues); //save to state
        // console.log(realVenues);
        for(let i  = 0 ;i < 10;i++){
          venues[i].venuesName = realVenues[i].venuee;
          venues[i].quota = realVenues[i].events.length;
        }
        // console.log(venues);
      }
    );
  }


  function logout(){
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    window.location.href = '/';
  }

  function showFav() {
    setClickedFav(!clickedFav);
    updateClickedLink(false);
  }
  function backToList(){
    updateClickedLink(false);
  }

  return (
    <>
      <header>
        <div className="d-flex align-items-center bg-info mb-3">
          <div id="userName" className="p-2"><b>{userName}</b></div>
          <div className="ms-auto p-2">
            <button id="logoutBtn" onClick={() => logout()} type="submit" className="btn btn-primary">
              <i className="bi bi-person"> </i>Logout
            </button></div>
        </div>
      </header>

      <div className="mb-3  d-flex flex-row justify-content-center align-items-center">
        <div className="p-2">
          <Link to ="/Dashboard">
          <button id="showFavBtn" onClick={()=>backToList()} className="btn btn-primary" type="submit">Back</button>
          </Link>
        </div>
        
        <div className="p-2">
        <i className="bi bi-search"> <input id = "searchText" onInput={()=> setSearch(document.getElementById("searchText").value)} type="text" placeholder="Search for locations"></input>
        </i>
         </div>
         
        <div className="p-2">
          <button id="showFavBtn" onClick={() => showFav()} className="btn btn-primary" type="submit">Show favorite locations</button>
        </div>
      </div>

      {/* middle main content */}
      {/* <Outlet /> */}
      {!clickedFav && <Tablelist content={search} clickedLink={clickedLink} updateClickedLink={updateClickedLink}/> }
      {clickedFav && <Favourite content={search} clickedLink={clickedLink} updateClickedLink={updateClickedLink}/>}
      {/* <Container clickedFav = {clickedFav}/> */}

      <footer className="bg-purple">
        <i className="bi bi-clock"> </i>Last updated on <span id = "lastUpdatedTime">2022-12-17 14:00</span>
      </footer>
    </>
  );
}

function Favourite(props) {
  const [sort, updateSort] = useState(false);
  const [choosedVenues, updateChoosedVenues] = useState(venues[0]); // selected venues from list, default = 1st venue
  const [venuesIndex, updateVenuesIndex] = useState(0); // selected venues index from list

  //function pass to child to update selected venues
  function selectedVenues(index, v) {
    console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }


  function sortEvent(sort) {
    // console.log(sort);
    if(sort){
      return favLists.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <ViewFavList clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<></>);
    }
    else{
      return favLists.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <ViewFavList clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:< div key={index}></div>);
    }
  }

  return (
    <div className="container bg-warning">
      <div className="row">
      {!props.clickedLink &&
        <div id = "favList" className="bg-danger border">
          <div className="d-flex justify-content-center align-items-center bg-secondary">
            <div className="p-2"></div>
            <div className="p-2">Venues</div>
            {/* <div className="p-2"><button onClick={()=>updateSort(!sort)} type="submit" className="btn btn-primary"><i className="bi bi-sort-down"></i></button></div> */}
          </div>
          <div id="tableList" className="list-group mb-3">
            {sortEvent(sort)}
          </div>
        </div>}
        {props.clickedLink && <div id = "details" className=" list-group mb-3">
          <Outlet />
        </div>}
      </div>
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
    console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }

  function sortEvent(mod1) {
    // console.log(sort);
      // let tmp = [];
      // let tmp2 = []; 
      // for (let i = 0; i < venues.length; i++){
      //   tmp.push(venues.quota);
      //   tmp2.push(venues.quota);
      // }
      // tmp.sort();
      // let ind = [];
      // for (let i = 0; i < venues.length; i++){
      //   ind.push(tmp2.indexOf[tmp[i]]);
      // }

      let venues2= JSON.parse(JSON.stringify(venues)); 
      venues2.sort((a,b)=>a.quota-b.quota);

      if (mod1 ==3){
        venues2.sort((a,b)=>b.quota-a.quota);
        return venues2.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<div key={index}></div>);
      }

      if (mod1 == 2){ // low to high
        return venues2.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<div key={index}></div>);
      }
      if (mod1 == 1){
      return venues.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <List clickedLink={props.clickedLink} updateClickedLink={props.updateClickedLink} venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<div key={index}></div>);}
  }

  return (
    <div className="container">
      <main>
        <div id = "mainContent" className="d-flex flex-row row mb-3">
          
          {!props.clickedLink && <div id = "table" className=" bg-warning">
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

          {props.clickedLink && <div id = "sideContent" className="bg-success">
            {/* <SideContent sideVenues = {choosedVenues} sideIndex={venuesIndex}/>
             */}
             <Outlet />
          </div>}
          
        </div>
      </main>
    </div>
  );
}

function SideContent(props) {
  const [comment, setComment] = useState("");
  const [comment_list, setCommentList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentList((comment_list) => [...comment_list, comment])
  }

  return (
    <div>
      <div class="my-3">
        <div class="card">
          <div class="card-body p-4">
            {/* {props.sideIndex}  */}
            <h2>{props.sideVenues.venuesName}</h2>
            <p>Location: lat, long</p>
          </div>


          {/* <div class="card-body px-4">
            <div class="d-flex flex-start">
              <div class="row">
                <div class="d-flex mb-1">
                  <p class="fw-bold m-0">"A Woman Is A Woman"- Fest of Belles and Queens: Actresses European and Hollywood</p>
                  <p class="m-0 ms-1"> on March 07, 2021 </p>
                </div>
                <div class="d-flex">
                  <p class="m-0">
                    'Five years after…And God Created Woman came A Woman Is a Woman. Anna Karina, directed by her future husband, plays a stripper, a text-book case of an object of male gaze. But the joint where she strips is presented by French New Wave genius Jean-Luc Godard with a certain utopic vision, where women who make a living displaying their bodies are not treated with contempt, where the male gaze is cast more as a healthy exercise of vive la difference acknowledging gender attraction than as exploitative power. The director calls the film a neo-realist musical, orchestrating everything with pop-art schemes like cartoons and splashes of primary colors, self-reflexively challenging the fourth wall with the kind of 1960s rebellious spirit that eventually gave rise to Laura Mulvey’s discovery of the male gaze. And Karina looks back at the gaze, literally and figuratively, with sensuousness, intelligence and humor, realizing this playful but also sophisticated masterpiece with her real-life lover, hand-in-hand and eye-to-eye. A Third-Wave feminist film made even before the Second Wave emerged?\n' +
                    '\n' +
                    '11/12 (Sun) 11:30am Cinema, Hong Kong Film Archive\n' +
                    'Post-screening Talk in Cantonese by Sonia Au',
                  </p>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>

      <div class="my-3">
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                "A Woman Is A Woman"- Fest of Belles and Queens: Actresses European and Hollywood
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
              <div class="card-body">
                    'Five years after…And God Created Woman came A Woman Is a Woman. Anna Karina, directed by her future husband, plays a stripper, a text-book case of an object of male gaze. But the joint where she strips is presented by French New Wave genius Jean-Luc Godard with a certain utopic vision, where women who make a living displaying their bodies are not treated with contempt, where the male gaze is cast more as a healthy exercise of vive la difference acknowledging gender attraction than as exploitative power. The director calls the film a neo-realist musical, orchestrating everything with pop-art schemes like cartoons and splashes of primary colors, self-reflexively challenging the fourth wall with the kind of 1960s rebellious spirit that eventually gave rise to Laura Mulvey’s discovery of the male gaze. And Karina looks back at the gaze, literally and figuratively, with sensuousness, intelligence and humor, realizing this playful but also sophisticated masterpiece with her real-life lover, hand-in-hand and eye-to-eye. A Third-Wave feminist film made even before the Second Wave emerged?\n' +
                    '\n' +
                    '11/12 (Sun) 11:30am Cinema, Hong Kong Film Archive\n' +
                    'Post-screening Talk in Cantonese by Sonia Au',
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Event #2
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
              <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div class="my-3">
        <div class="card">

          <div>
            <div class="card-body p-4">
              <div class="d-flex flex-start">
                <div class="row">
                  <div class="d-flex mb-1">
                    <p class="fw-bold m-0">Maggie Marsh</p>
                    <p class="m-0 ms-1"> on March 07, 2021 </p>
                  </div>
                  <div class="d-flex">
                    <p class="m-0">
                      Lorem ipsum dolor sit amet, ligula suspendisse nulla pretium
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-0" />
          </div>


          <div>
            <div class="card-body p-4">
              <div class="d-flex flex-start">
                <div class="row">
                  <div class="d-flex mb-1">
                    <p class="fw-bold m-0">Lara Stewart</p>
                    <p class="m-0 ms-1"> on March 15, 2021 </p>
                  </div>
                  <div class="d-flex">
                    <p class="m-0">
                      rhoncus tempor placerat fermentum, enim integer ad vestibulum volu
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-0" />
          </div>


          {comment_list.map((item) => (
            <div>
              <div class="card-body p-4">
                <div class="d-flex flex-start">
                  <div class="row">
                    <div class="d-flex mb-1">
                      <p class="fw-bold m-0">{item.username}</p>
                      <p class="m-0 ms-1"> on {item.date} </p>
                    </div>
                    <div class="d-flex">
                      <p class="m-0">{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-0" />
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

function List(props) {
  const [favorite, updateFavorite] = useState(false);
  let i = props.i; //index
  let venuesObj = props.venuesObj;
  let name = props.venuesObj.venuesName;
  let quota = props.venuesObj.quota;
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

    let objIndexInFavList = favLists.map(e => e.venuesName).indexOf(venuesObj.venuesName);
    // console.log(objIndexInFavList);
    // console.log(favLists);
    if (objIndexInFavList == -1) { //no such venue in fav lists
      favLists.push(venuesObj);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store

    }
    else { //hv venue, delete it
      favLists.splice(objIndexInFavList, 1);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
    }
  }

  return (
    <div className='d-flex flex-row align-items-center'>
      <div className="list-group-item list-group-item-action p-4 border-bottom border-dark">
        <div onClick={(e)=>handleClick(e)}>
          <Link to ={`${name}`} style={{ textDecoration: 'none', color: "black" }}>
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
  let name = props.venuesObj.venuesName;
  let quota = props.venuesObj.quota;
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

    let objIndexInFavList = favLists.map(e => e.venuesName).indexOf(venuesObj.venuesName);
    // console.log(objIndexInFavList);
    // console.log(favLists);
    if (objIndexInFavList == -1) { //no such venue in fav lists
      favLists.push(venuesObj);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store

    }
    else { //hv venue, delete it
      favLists.splice(objIndexInFavList, 1);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
    }
  }

  return (
    <div>
    {favorite &&  <div className='d-flex flex-row align-items-center'>
      <div className="list-group-item list-group-item-action p-4 border-bottom border-dark">
        <div onClick={(e)=>handleClick(e)}>
            <Link to ={`${name}`} style={{ textDecoration: 'none', color: "black" }}>
                <div><i className="bi bi-geo-alt"> </i>{name}</div>
                <div><i className="bi bi-calendar-event"> </i>{quota + " events"}</div>
            </Link>
          </div>
      </div>
      {/* fav icon star */}
      <div onClick={()=>addFav()} className='ms-auto p-2'>
        <div className='btn'>
          <i className="bi bi-dash-square-fill" style={{color: "black"}}></i>
        </div>
      </div>} </div>
  );
}

export default Dashboard;