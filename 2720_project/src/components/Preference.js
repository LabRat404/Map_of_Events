import React, { Component, useState } from "react";

function getdata(){

    fetch("http://localhost:3001/getUsers", {
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

function addUser(){

  fetch("http://localhost:3001/addUsers", {
    method: "POST",
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

function updateUser(){

  fetch("http://localhost:3001/addUsers", {
    method: "PUT",
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

function delUser(){

  fetch("http://localhost:3001/deleteUsers", {
    method: "DELETE",
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
<button onClick={delUser} >Delete</button>
</>
    

    );
  }
}