import React, { Component } from 'react';

let venues = ["v1","v2","v3","v4","v5","v6","v7","v8","v9","v10"];

export default class Dashboard extends Component {
  render() {
    return(
      <>
        <header>        
          <div className="d-flex bg-info mb-3">
            <div id = "userName" className="p-2">User Name</div>
            <div className="ms-auto p-2"><button type="submit" className="btn btn-primary">Log out</button></div>
          </div>
        </header>

        <div className="container">

          <main>
            <div className="mb-3">
              <input id = "searchText" className="col-10" type="text" placeholder="Search for locations"></input>
              <button className="col-2 rounded-pill" type="submit">Search</button>
            </div>
            <div id = "mainContent" className="row">
              <div id = "table" className="col-5 bg-warning">
                test table area
              </div>
              <div id = "content" className="col-7 bg-success">
                test content area(details info/ comment section?)
              </div>
            </div>
          </main>
      

          <footer className="fixed-bottom">
            Last updated on <span id = "lastUpdatedTime">2022-12-14</span>.
          </footer>
        </div>
      </>
    );
  }
}