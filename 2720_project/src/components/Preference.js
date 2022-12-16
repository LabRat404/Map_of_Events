import { render } from "@testing-library/react";
import "bootstrap-icons/font/bootstrap-icons.css";
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
   
     body:JSON.stringify({old: uname, username: document.getElementById(uname+"username").value, password: document.getElementById(uname+"pw").value})
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
        document.getElementById(data1[i].username).value = data1[i].username;
        document.getElementById(data1[i].username+"p").value = data1[i].password;
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
          <input value="Old Username"></input>
          <input value="Old Password"></input>
          <br></br>
          <input value="New Username"></input>
          <input value="New Password"></input>
          <p>-------------------------------------------User Records-------------------------------------------</p>

        {data1.map((_,index) => 
   <>
          <input id={data1[index].username}readonly></input>
          <input type="text" id={data1[index].username+"p"}readonly></input>
          <br></br>
          <input placeholder="New Username" id={data1[index].username+"username"} required></input>
          <input placeholder="New Password" id={data1[index].username+"pw"}></input>
          <br></br>
          <button className="btn btn-success"onClick={(e)=>{ e.preventDefault(); updateUser(data1[index].username); setclick(true);}}>Update</button>  
          <button className="btn btn-danger" onClick={(e)=>{ e.preventDefault(); delUser(data1[index].username); setclick(true);}}>Delete</button>  
          <br></br>
          <br></br>
        
       
          {/* <input id={data1[index].password}></input>  */}
   </>
         
        
        )}
           <p>-------------------------------------------Add new User-------------------------------------------</p>

          <input placeholder="Username" id="uname"></input>
          <input placeholder="Password" id="pw"></input>
          <br></br>
          <br></br>
          <button id="add" className="btn btn-primary" onClick={(e)=>{ e.preventDefault(); addUser(); setclick(true);}}><i className="bi bi-plus"></i>Add User</button>  
      </form>

    </main>
    

    )
  
}