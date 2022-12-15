import React, { Component, useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

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

function Dashboard(){
  const [sort, updateSort] = useState(false);

  function sortEvent(sort){
    // console.log(sort);
    if(sort){
      return "sort";
    }
    else{
      return venues.map((obj,index) => <List venuesObj={obj} i = {index} key={index}/>);
    }
  }

    return(
      <>
        <header>        
          <div className="d-flex align-items-center bg-info mb-3">
            <div id = "userName" className="p-2"><b>User Name</b></div>
            <div className="ms-auto p-2"><button type="submit" className="btn btn-primary"><i class="bi bi-person"> </i>Logout</button></div>
          </div>
        </header>

        <div className="container">

          <main>
            <div className="mb-3  d-flex flex-row justify-content-center align-items-center">
              <div className="p-2">
              <input id = "searchText" type="text" placeholder="Search for locations"></input>
              </div>
              <div className="p-2">
                <button className="btn btn-primary" type="submit"><i class="bi bi-search"></i></button>
              </div>
              <div className="ms-auto p-2">
                <button className="btn btn-primary" type="submit">Show favorite locations</button>
              </div>
            </div>

            <div id = "mainContent" className="d-flex flex-row row mb-3">
              
              <div id = "table" className="col-5 bg-warning">
                <div className="d-flex justify-content-between align-items-center bg-secondary">
                  <div className="p-2"></div>
                  <div className="p-2">Venues</div>
                  <div className="p-2"><button onClick={()=>updateSort(!sort)} type="submit" className="btn btn-primary"><i class="bi bi-sort-down"></i></button></div>
                </div>
                <div id = "tableList" className="list-group mb-3">
                  {sortEvent(sort)}
                  {/* {venues.map((name,index) => <List name={name} i = {index} key={index}/>)} */}
                </div>
              </div>

              <div id = "content" className="col-7 bg-success">
                test content area(details info/ comment section?)
              </div>
              
            </div>
          </main>
      
        </div>
        <footer>
        <i class="bi bi-clock"> </i>Last updated on <span id = "lastUpdatedTime">2022-12-14</span>.
          </footer>
      </>
    );

}

function List(props){
  const [selected, updateSelected] = useState(-1);
  const [favorite, updateFavorite] = useState(false);
  let i = props.i; //index
  let name = props.venuesObj.venuesName;
  let quota = props.venuesObj.quota;
  // console.log(name);
  
  // clicked link
  function handleClick(e){
    console.log("selected " + name)
  }

  //added to favourite
  function addFav(){
    updateFavorite(!favorite);
    // changeFav();
  }

  return(

    <div className='d-flex flex-row align-items-center'>
      <div onClick={(e) => handleClick(e)} className="list-group-item list-group-item-action p-4 border-bottom border-dark">
        <div><i class="bi bi-geo-alt"> </i>{name}</div>
        <div><i class="bi bi-calendar-event"> </i>{quota + " events"}</div>
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