import React, { Component, useState } from "react";
function getdata(){

    fetch("http://localhost:3001/getusers", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      
        console.log(data);
      
    });
  
}

function Logout() {
  localStorage.clear();
  window.location.href = '/';
}  


export default class Preferences extends Component {
 

  render() {
    return(
 
<>
<button onClick={Logout} >Logout</button>


</>
    

    );
  }
}