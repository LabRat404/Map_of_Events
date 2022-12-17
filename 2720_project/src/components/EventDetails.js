import { useParams, BrowserRouter, Navigate, Route, Routes, useNavigate,Link, Outlet } from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

function EventDetails(props){
    let {vName} = useParams();
   
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
              <h2>{vName}</h2>
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
  
  
            {comment_list.map((comment) => (
              <div>
                <div class="card-body p-4">
                  <div class="d-flex flex-start">
                    <div class="row">
                      <div class="d-flex mb-1">
                        <p class="fw-bold m-0">user1</p>
                        <p class="m-0 ms-1"> on 17 Dec 2022 </p>
                      </div>
                      <div class="d-flex">
                        <p class="m-0">{comment}</p>
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
export default EventDetails;