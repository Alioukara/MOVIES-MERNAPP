import React from 'react';
import "../styles/sidebar.scss"
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

const cookies = new Cookies();

function Sidebar() {
  let history = useHistory();

  const logOut = () => {

    cookies.remove('accesstoken', "userID");
    cookies.remove("userID");
    cookies.remove('username');
    history.push('/')
    window.location.reload(false);

  };
  const isLoggedin = cookies.get('accesstoken')
  return isLoggedin ? (
    <main className="main">
      <aside className="sidebar">
        <nav className="nav">
          <ul>
            <li className="active"><a href="/films">Films</a></li>

            <li className="active"><a href="/dashboard">Dashboard</a></li>
            <li className="active"><a href="/forum">Forum</a></li>
            <li className="active"><a href="#" onClick={logOut}>Logout</a></li>
            <li className="active"><a href="#">Contact</a></li>
          </ul>
        </nav>
      </aside>

    </main>

  ) : <main className="main">
    <aside className="sidebar">
      <nav className="nav">
        <ul>
          <li className="active"><a href="/welcome">Welcome</a></li>
          <li className="active"><a href="/login">Login</a></li>
          <li className="active"><a href="/register">Register</a></li>
          <li className="active"><a href="#">Contact</a></li>
        </ul>
      </nav>
    </aside>

  </main>;
}

export default Sidebar;