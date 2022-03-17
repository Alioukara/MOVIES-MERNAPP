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

import { SocketProvider } from '../src/contexts/SocketProvider';

import './App.css';

import Cookies from 'universal-cookie';

 
const cookies = new Cookies();

function App() {

 
  const id =  cookies.get('accesstoken')

  return (
  
   
    <Router>
      <Sidebar />

      <Switch>
     
      <Route  path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route exact path="/"><Welcome /></Route>
      <Route path="/dashboard"><Dashboard /></Route>
      <Route path="/films"><AllFilms /></Route>
      <Route path="/filmdetails/:id"><FilmDetails /></Route>
      <SocketProvider id={id}>
      <Route path="/forum"><Forum id={id} /></Route>
      {/* <Route path="/streaming"><StreamVideo/></Route> */}
      </SocketProvider>
      </Switch>
    

    </Router>
   
   
    

  );
}

export default App;
