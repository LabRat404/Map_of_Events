import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
export default function Preferences() {
 const [data1, setdata1] = useState([{"username": "loading"}]);
 const [click, setclick] = useState(false)

  function addUser(){
    fetch("http://localhost:3001/addUsers", {
      method: "POST",
      //mode: "no-cors",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify({username: document.getElementById("uname").value, password: document.getElementById("pw").value})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      
    });
  
  }
  
  function updateUser(uname){
    console.log(uname+"username");
    fetch("http://localhost:3001/updateUsers", {
      method: "PUT",
      // crossDomain: true,

      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
   
     body:JSON.stringify({username: document.getElementById(uname+"username").value, password: document.getElementById(uname+"pw").value})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      
    });
  
  }
  
  function delUser(username){

    fetch("http://localhost:3001/deleteUsers", {
      method: "DELETE",
      // crossDomain: true,

      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body:JSON.stringify({name: username})
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
        document.getElementById(data1[i].username+"username").value = data1[i].username;
        // document.getElementById(data1[i].password).value = data1[i].password;
      }
    })
  }, [click, data1])
  
    return(
 
    <main>
      <header>        
          <div className="d-flex align-items-center bg-info mb-3">
            <div id = "userName" className="p-2">Admin Panel</div>
            <div className="ms-auto p-2"><button type="submit" className="btn btn-primary" onClick={()=>{Logout(); setclick(true);}}>Log out</button></div>
          </div>
        </header>
      <form>
          <input value="Username"></input>
          <input value="Password"></input>
          <br></br>
        {data1.map((_,index) => 
   <>
          <input id={data1[index].username+"username"}></input>
          <input id={data1[index].username+"pw"}></input>
          <button onClick={(e)=>{ e.preventDefault(); updateUser(data1[index].username); setclick(true);}}>Update</button>  
          <button onClick={(e)=>{ e.preventDefault(); delUser(data1[index].username); setclick(true);}}>Delete</button>  
          <br></br>
          <br></br>
        
       
          {/* <input id={data1[index].password}></input>  */}
   </>
         
        
        )}
          <h5>Add a user</h5>
          <input id="uname"></input>
          <input id="pw"></input>
          <button id="add" onClick={(e)=>{ e.preventDefault(); addUser(); setclick(true);}}>Add User</button>  
      </form>

    </main>
    

    )
  
}