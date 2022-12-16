import React, { Component, useState, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

let user;
let venues = [{venuesName: "Tai Po Public Library", quota: 100},
              {venuesName: "Sha Tin Town Hall (Cultural Activities Hall)", quota: 50},
              {venuesName: "Fu Shan Public Library", quota: 30},
              {venuesName: "Hong Kong Cultural Centre (Concert Hall)", quota: 10},
              {venuesName: "Butterfly Estate Public Library", quota: 70},
              {venuesName: "Chai Wan Public Library", quota: 80},
              {venuesName: "City Hall Public Library", quota: 90},
              {venuesName: "Electric Road Public Library", quota: 50},
              {venuesName: "Fa Yuen Street Public Library", quota: 20},
              {venuesName: "Fanling Public Library", quota: 300}
            ];
let sortedVenues =[];
let favLists =  [];

function Dashboard(){
  const [userName, setUserName] = useState();
  const [clickedFav, setClickedFav] = useState(false);
  const [search, setSearch] = useState("");
  //get user name
  useEffect(()=>{
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
    setUserName(decodedToken.email);
    user = userName;
    // console.log(user);
    // window.localStorage.removeItem('user2');
    if(userName != undefined){
      let userFavList = window.localStorage.getItem(userName);
      if(userFavList == null){ //no such user
        console.log("new user, empty fav list");
        window.localStorage.setItem(userName, JSON.stringify([]));
        // window.localStorage.removeItem('testuser');
        // console.log(favLists);
      }
      else{//hv records
        favLists = JSON.parse(userFavList);
        // console.log(favLists.length);
        // console.log(favLists);
        console.log("old user, hv list");
      }
    }
  });


  function logout(){

  }

  function showFav(){
    setClickedFav(!clickedFav);
  }

  return(
    <>
      <header>        
        <div className="d-flex align-items-center bg-info mb-3">
          <div id = "userName" className="p-2"><b>{userName}</b></div>
          <div className="ms-auto p-2"><button id="logoutBtn" onClick={()=>logout()} type="submit" className="btn btn-primary"><i className="bi bi-person"> </i>Logout</button></div>
        </div>
      </header>


      <div className="mb-3  d-flex flex-row justify-content-center align-items-center">
        <div className="p-2">
        <i className="bi bi-search"> <input id = "searchText" onInput={()=> setSearch(document.getElementById("searchText").value)} type="text" placeholder="Search for locations"></input>
      </i>
         </div>
      
        <div className="p-2">
          <button id="showFavBtn" onClick={()=>showFav()} className="btn btn-primary" type="submit">Show favorite locations</button>
        </div>
      </div>




      {/* middle main content */}
      {!clickedFav && <Tablelist content={search}/> }
      {clickedFav && <Favourite user = {userName}/>}
      {/* <Container clickedFav = {clickedFav}/> */}

      <footer className="bg-purple">
        <i className="bi bi-clock"> </i>Last updated on <span id = "lastUpdatedTime">2022-12-14</span>.
      </footer>
    </>
  );
}

function Favourite(props){
  const [sort, updateSort] = useState(false);
  const [choosedVenues, updateChoosedVenues] = useState(venues[0]); // selected venues from list, default = 1st venue
  const [venuesIndex, updateVenuesIndex] = useState(0); // selected venues index from list

  //function pass to child to update selected venues
  function selectedVenues(index, v){ 
    console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }


  function sortEvent(sort){
    // console.log(sort);
    if(sort){
      return venues.map((obj,index) => <List venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>);
    }
    else{
      return favLists.map((obj,index) => <List venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>);
    }
  }

  return(
    <div className="container">
      <div id = "favList" className="bg-danger p-5 border">
        <div className="d-flex justify-content-between align-items-center bg-secondary">
          <div className="p-2"></div>
          <div className="p-2">Venues</div>
          <div className="p-2"><button onClick={()=>updateSort(!sort)} type="submit" className="btn btn-primary"><i className="bi bi-sort-down"></i></button></div>
        </div>
        <div id = "tableList" className="list-group mb-3">
          {sortEvent(sort)}
        </div>
      </div>
    </div>
  );
}

// User action 1
function Tablelist(props){
  const [sort, updateSort] = useState(false);
  const [choosedVenues, updateChoosedVenues] = useState(venues[0]); // selected venues from list, default = 1st venue
  const [venuesIndex, updateVenuesIndex] = useState(0); // selected venues index from list
  const [mod, setMod] = useState(1);
  //function pass to child to update selected venues
  function selectedVenues(index, v){ 
    console.log(v);
    updateVenuesIndex(index);
    updateChoosedVenues(v);
  }

  function sortEvent(mod1){
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
      <List venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<></>);
      }

      if (mod1 == 2){ // low to high
        return venues2.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <List venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<></>);
      }
      if (mod1 == 1){
      return venues.map((obj,index) => obj.venuesName.toLowerCase().includes(props.content.toLowerCase())?
      <List venuesObj={obj} i = {index} key={index} selectedVenues = {selectedVenues}/>:<></>);}
    
  }

  return(
    <div className="container">
      <main>
        <div id = "mainContent" className="d-flex flex-row row mb-3">
          
          <div id = "table" className="col-5 bg-warning">
            <div className="d-flex justify-content-between align-items-center bg-secondary">
              <div className="p-2"></div>
              <div className="p-2">Venues</div>
              <div id="sorting"  className="p-2"><button onClick={()=>{setMod(mod==3?1:mod+1)}} type="submit" className="btn btn-primary"><i className="bi bi-sort-down"></i></button></div>
              {/* updateSort(!sort);  */}
            </div>
            <div id = "tableList" className="list-group mb-3">
              {sortEvent(mod)}
            </div>
          </div>

          <div id = "sideContent" className="col-7 bg-success">
            test content area(details info/ comment section?)
            <SideContent sideVenues = {choosedVenues} sideIndex={venuesIndex}/>
          </div>
          
        </div>
      </main>
    </div>
  );
}

function SideContent(props){
  return(
    <div>
      <br></br>
      {props.sideIndex}
      <br></br>
      {props.sideVenues.venuesName}
    </div>
  );
}

function List(props){
  const [favorite, updateFavorite] = useState(false);
  let i = props.i; //index
  let venuesObj= props.venuesObj;
  let name = props.venuesObj.venuesName;
  let quota = props.venuesObj.quota;
  // console.log(name);
  
  // clicked link
  function handleClick(e){
    // console.log("selected " + name)
    props.selectedVenues(i, venuesObj); //update parent Tablelist selectedVenues
  }

  //added to favourite
  function addFav(){
    updateFavorite(!favorite);

    let objIndexInFavList = favLists.map(e => e.venuesName).indexOf(venuesObj.venuesName);
    // console.log(objIndexInFavList);
    // console.log(favLists);
    if(objIndexInFavList == -1){ //no such venue in fav lists
      favLists.push(venuesObj);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
      
    }
    else{ //hv venue, delete it
      favLists.splice(objIndexInFavList,1);
      console.log(favLists);
      window.localStorage.setItem(user, JSON.stringify(favLists)); //update fav in local store
    }
  }

  return(
    <div className='d-flex flex-row align-items-center'>
      <div onClick={(e) => handleClick(e)} className="list-group-item list-group-item-action p-4 border-bottom border-dark">
        <div><i className="bi bi-geo-alt"> </i>{name}</div>
        <div><i className="bi bi-calendar-event"> </i>{quota + " events"}</div>
      </div>
      {/* fav icon star */}
      <div onClick={()=>addFav()} className='ms-auto p-2'>
        <div className=''>
          {favorite?<i className="bi bi-star-fill"></i>:<i className="bi bi-star"></i>}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;