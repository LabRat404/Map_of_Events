import React, { Component, useState } from 'react';

let venues = ["v1","v2","v3","v4","v5","v6","v7","v8","v9","v10"];

function Dashboard(){
 
    return(
      <>
        <header>        
          <div className="d-flex align-items-center bg-info mb-3">
            <div id = "userName" className="p-2">User Name</div>
            <div className="ms-auto p-2"><button type="submit" className="btn btn-primary">Log out</button></div>
          </div>
        </header>

        <div className="container">

          <main>
            <div className="mb-3  d-flex flex-row justify-content-center align-items-center">
              <div>
              <input id = "searchText" type="text" placeholder="Search for locations"></input>
              </div>
              <div className="p-2">
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </div>

            <div id = "mainContent" className="d-flex flex-row row mb-3">
              
              <div id = "table" className="col-5 bg-warning">
                <div className="d-flex justify-content-between align-items-center bg-secondary">
                  <div className="p-2">Venues</div>
                  <div className="p-2">Number of Events</div>
                  <div className="p-2"><button type="submit" className="btn btn-primary">Sort</button></div>
                </div>
                <div className="list-group mb-3">
                  {venues.map((name,index) => <List name={name} i = {index} key={index}/>)}
                </div>
              </div>

              <div id = "content" className="col-7 bg-success">
                test content area(details info/ comment section?)
              </div>
            </div>
          </main>
      

          <footer>
            Last updated on <span id = "lastUpdatedTime">2022-12-14</span>.
          </footer>
        </div>
      </>
    );

}

function List(props){
  const [selected, updateSelected] = useState(-1);
  let i = props.i; //index
  let name = props.name;
  // console.log(name);
  
  function handleClick(e){

  }

  return(

    <div className='d-flex'>
      <div onClick={(e) => handleClick(e)} className="list-group-item list-group-item-action">
      {/* <a href="#" className="list-group-item list-group-item-action" aria-current="true">
        {venues[i] + "<br>" + "\nwith quota 2"}
      </a> */}
        <div>{name}</div>
        <div>number of events is: </div>
      </div>
      {/* fav icon star */}
      <div><button>add</button></div>
    </div>
  );
}

export default Dashboard;