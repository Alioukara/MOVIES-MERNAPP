import React, { useLayoutEffect } from 'react';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/filmDetails.css'

const FilmDetails = () => {
    const { id } = useParams()

    const [filmdetails, setFilmetails] = useState({});
    const [production, setProduction] = useState([]);




    useLayoutEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/movie/' + id,

        };

        axios(config)
            .then((response) => {
                setFilmetails(response.data);
                // setProduction(filmdetails.production_companies)


            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    useEffect(() => {
        setProduction(filmdetails.production_companies)
    }, [])



    return (
        <div style={{ textAlign: "center", justifyContent: "center" }}>
            <h1 id="detailsTitle">{filmdetails.title}</h1>
            <div className="details" className="row no-gutters">


                <div className=" container justify-content-center col">

                    <div className="card" style={{ width: "65%", height: "auto", marginLeft: "10%" }}>
                        <img className="card-img-top " src={`https://image.tmdb.org/t/p/w500/` + filmdetails.poster_path} alt="Card image cap" />

                    </div>
                </div>
                <div className=" container justify-content-md-center col">

                    <div className="card" style={{ width: "65%", height: "auto" }}>

                        <div className="card-body justify-content-md-center" id='cardbodyDetails'>
                            <h1>Overview:</h1>
                            <h3 className="card-text">{filmdetails.overview}</h3>
                            <hr /><hr /><hr />
                            <div className="row align-items-middle">
                                <span className="col">
                                    <h4 >Release date:</h4>
                                    <h5>{filmdetails.release_date}</h5>
                                </span>
                                <span className="col">
                                    <label ></label>
                                    <p></p>
                                </span>
                                <span className="col"><a href={filmdetails.homepage} target="_blank"><button type='button' className="btn btn-primary">Site web<i className="bi bi-play"></i></button></a></span>

                            </div>

                        </div>
                    </div>


                </div>

            </div>
            <div>
                <div>

                   <p style={{border: "solid 2px black"}}>lkajdjsalkdjsldjsqlkjdlkj</p>
                    
                </div>
            </div>
        </div>



    );



};

export default FilmDetails;