import React, { useEffect, useState } from "react";
import "../styles/allFilms.css"
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import axiosClient from "../Apis/api"
const AllFilms = () => {
  
  const [films, setFilms] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState("");
  
 
  useEffect(() => {
      axiosClient.get('movies/' + pageNum)
      .then((response) => {
        setFilms(response.data.results);
      
        
         

      })
      .catch((error) => {
        console.log(error);
      });

  }, [pageNum])

  const nextPages = () => {
    setPageNum(pageNum + 1)
   
  }
  const previousPages = () => {
    if (pageNum === 1) return
    else {
      setPageNum(pageNum - 1)
     
    }

  }

  const searchMovieBytitle = () => {
       axiosClient.get("searchmovie/" + search)
      .then((response) => {
        setFilms(response.data.results);
       
      
      })
      .catch((error) => {
        console.log(error);
      });

  }

  
  return (
    <div id="allfilms">

      <div style={{ width: "20%" }} className="m-auto d-flex flex-row">

        <input type="search" className="form-control rounded m-auto" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" className="btn btn-info m-auto" onClick={searchMovieBytitle}><i className="bi bi-search"></i></button>


      </div>
      <nav aria-label="Page navigation example" className="mt-3">
        <ul className="pagination  justify-content-center">
          <li className="page-item py-0" onClick={previousPages}>
            <a className="page-link py-0" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <p className="page-item py-0"><a className="page-link py-0" href="#">page {pageNum}</a></p>


          <li className="page-item py-0" onClick={nextPages}>
            <a className="page-link py-0" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container justify-content-md-center">
 
        <div /*className="allfilms"*/ className="row justify-content-md-center row-cols-auto">
          {films.map((el) => (el.backdrop_path ?

            <Link to={{ pathname: `/filmdetails/${el.id}`  }} className="card movie_card" key={el.id}>
              
              <img className="poster" src={`https://image.tmdb.org/t/p/w500/` + el.backdrop_path} id='imagefilm' />
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title col">{el.title}</h5>
                  




                </div>
                <span className="movie_info" >{el.release_date.substr(0, 4)}</span>
                <span className="movie_info float-right" id="vote" >{el.vote_average} / 10</span>
              </div>
           

            </Link> : "" ))


          }

          

        
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination  justify-content-center">
          <li className="page-item py-0" onClick={previousPages}>
            <a className="page-link py-0" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <p className="page-item py-0"><a className="page-link py-0" href="#">page {pageNum}</a></p>


          <li className="page-item py-0" onClick={nextPages}>
            <a className="page-link py-0" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default AllFilms;