import React, { useEffect, useState } from "react";
import axios from 'axios'
import "../styles/allFilms.css"
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const AllFilms = () => {
  const [films, setFilms] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:5000/movies/' + pageNum,

    };

    axios(config)
      .then((response) => {
        setFilms(response.data.results);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [pageNum])

  const nextPages = () => {
    setPageNum(pageNum + 1)
    console.log(pageNum)
  }
  const previousPages = () => {
    if (pageNum === 1) return
    else {
      setPageNum(pageNum - 1)
      console.log(pageNum)
    }

  }
  // const onChangeSearch = (e) => {
  //   setSearch(e.target.value)
  //   console.log(search)
  // }
  const searchMovueBytitle = () => {
    var config = {
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=104bfb2d8d90ad73561117d85c20a24a&language=en-US&query=${encodeURI(search)}&page=1&include_adult=false`,

    };

    axios(config)
      .then((response) => {
        setFilms(response.data.results);

      })
      .catch((error) => {
        console.log(error);
      });

    }
  return (
    <div id="allfilms">
      
      <div className="input-group rounded" style={{width: "20rem", float:"right"}}>
      
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search}  onChange={(e) => setSearch(e.target.value)}/>
  <span className="input-group-text border-0" id="search-addon">
    <button type="button" className="btn btn-info" onClick={searchMovueBytitle}>search</button>
  </span>
</div>
      <nav aria-label="Page navigation example">
        <ul className="pagination  justify-content-center">
          <li className="page-item" onClick={previousPages}>
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <h4 className="page-item"><a className="page-link" href="#">page {pageNum}</a></h4>


          <li className="page-item" onClick={nextPages}>
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container justify-content-md-center"> 

        <div className="allfilms" className="row justify-content-md-center row-cols-auto">
          {films.map((el) => (el.backdrop_path ? 
            <div className="card movie_card" key={el.id}>
              <img src={`https://image.tmdb.org/t/p/w500/` + el.backdrop_path} id='imagefilm' />
              <div className="card-body">
              <div className="row">
              <h5 className="card-title col">{el.title}</h5>
              <Link to={{ pathname: `/filmdetails/${el.id}` }} className="col">
             
              <img id="seeMore" src="https://img.icons8.com/color/48/000000/connection-status-off--v1.png"/>
              </Link>
     
              
                </div>
                <span className="movie_info" >{el.release_date.substr(0, 4)}</span>
                <span className="movie_info float-right" id="vote" >{el.vote_average} / 10</span>
              </div>
            </div>: ""))}

        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination  justify-content-center">

          <li className="page-item" onClick={previousPages}>
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <h4 className="page-item"><a className="page-link" href="#">page {pageNum}</a></h4>


          <li className="page-item" onClick={nextPages}>
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default AllFilms;