import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Sidebar from "./components/sidebar";
import Welcome from "./components/welcome";
import Dashboard from "./components/dashboard"
import AllFilms from "./components/allFilms"
import FilmDetails from "./components/filmDetails";
import Forum from "./components/forum";
import StreamVideo from "./components/StreamVideo";
import { SocketProvider } from '../src/contexts/SocketProvider';

import './App.css';

import Cookies from 'universal-cookie';
import { useState } from "react";
 
const cookies = new Cookies();

function App() {

 
  const id =  cookies.get('accesstoken')

  return (
  
   
    <Router>
      <Sidebar />
    <div>
      <Switch>
     
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/"><Welcome /></Route>
      <Route path="/dashboard"><Dashboard /></Route>
      <Route path="/films"><AllFilms /></Route>
      <Route path="/filmdetails/:id"><FilmDetails /></Route>
      <SocketProvider id={id}>
      <Route path="/forum"><Forum id={id} /></Route>
      {/* <Route path="/streaming"><StreamVideo/></Route> */}
      </SocketProvider>
      </Switch>
    </div>

    </Router>
   
   
    

  );
}

export default App;
