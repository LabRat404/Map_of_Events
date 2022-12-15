import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
export default function Preferences() {
 const [data1, setdata1] = useState([{"username": "loading"}]);
 const [click, setclick] = useState(false)

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
  
  function updateUser(username){
  
    fetch("http://localhost:3001/updateUsers", {
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
  
  function delUser(username){
    console.log(username);
    fetch("http://localhost:3001/deleteUsers", {
      method: "DELETE",
      // crossDomain: true,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body:{name: username}
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
  
  useEffect(()=>{
    fetch("http://localhost:3001/getUsers", {
      method: "GET",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setdata1(data);
      setclick(false);
      for(let i = 0; i<data1.length; i++){
        document.getElementById(data1[i].username).value = data1[i].username;
        // document.getElementById(data1[i].password).value = data1[i].password;
      }
    })
  }, [click, data1])
  
    return(
 
    <main>

      <button onClick={()=>{Logout(); setclick(true);}}>Logout</button>
      
      <form>
          <input value="Username"></input>
          <input value="Password"></input>
          <br></br>
        {data1.map((_,index) => 
   <>
          <input id={data1[index].username}></input>
          <input id={data1[index].password}></input>
          <button onClick={(e)=>{ e.preventDefault(); updateUser(data1[index].username); setclick(true);}}>Update</button>  
          <button onClick={(e)=>{ e.preventDefault(); delUser(data1[index].username); setclick(true);}}>Delete</button>  
          <br></br>
          {/* <input id={data1[index].password}></input>  */}
   </>
         
        
        )}
      </form>

    </main>
    

    )
  
}