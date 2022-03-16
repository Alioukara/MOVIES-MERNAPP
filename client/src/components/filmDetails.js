import React, { useLayoutEffect } from 'react';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/filmDetails.css'
import { Form, InputGroup, Button } from 'react-bootstrap'
import axiosClient from "../Apis/api"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const FilmDetails = () => {
    const { id } = useParams()
    const currentTime = new Date();
    const userId = cookies.get("userID")
    const username = cookies.get("username")
    const [allDBcomments, setAllDBcomments] = useState()



    const [filmdetails, setFilmetails] = useState({});
    const [production, setProduction] = useState([]);
    const [commentBody, setCommentBody] = useState("")
    const [comments, setComments] = useState([])
    const [commentDate, setCommentDate] = useState("")




    useLayoutEffect(() => {
     
        axiosClient.get('movie/' + id)
            .then((response) => {
                setFilmetails(response.data);
                // setProduction(filmdetails.production_companies)


            })
            .catch((error) => {
                console.log(error);
            });

    }, [])
    useEffect(
        () => {

            axiosClient.get("comments/" + id).then(res => {

                setAllDBcomments(res.data)


            })
                .catch((err) => {
                    console.log(err)
                });
        }, [])

    useEffect(() => {
        setProduction(filmdetails.production_companies)
    }, [])

    const addComment = (e) => {
        e.preventDefault()
        setCommentDate(`${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours() + ":" + currentTime.getMinutes()}`)

        var data = JSON.stringify({
            body: commentBody,
            username: username,
            filmsId: id,
            userId: userId,
            commentTime: commentDate
        });

        var config = {
            method: 'post',
            url: 'https://weloveallmovies.herokuapp.com/comments/newcomment',
            headers: {
                'auth-token': cookies.get("accesstoken"),
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                setComments([...comments, { commentBody, username, commentDate }])

                setCommentBody("")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div style={{ textAlign: "center", justifyContent: "center", marginLeft: "10%" }}>
            <h1 id="detailsTitle">{filmdetails.title}</h1>
            <div /*className="details"*/ className="row no-gutters">


                <div className=" container justify-content-center col">

                    <div className="card" style={{ width: "65%", height: "auto" }}>
                        <img className="card-img-top " src={`https://image.tmdb.org/t/p/w500/` + filmdetails.poster_path} alt="Card image cap" />

                    </div>
                </div>
                <div className="container justify-content-md-center col">

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
            <div className='justify-content-center' >
                <h1>Comments</h1>
                <Form onSubmit={addComment} className="align-items-end">
                    <Form.Control
                        style={{ border: "solid 2px rgb(125, 128, 131)", width: "50%", maxWidth: "50%", margin: "auto auto", backgroundColor: "black", color: "rgb(125, 128, 131)" }}
                        required
                        name="comment"
                        placeholder="Write your comment here"
                        onChange={(e) => setCommentBody(e.target.value)}

                        value={commentBody}

                    ></Form.Control>
                    <Form.Group className="m-2 ">
                    </Form.Group>
                </Form>
                <div id="comment" className="card justify-content-center" style={{ margin: "auto auto", width: "50%", overflowY: 'auto' }}>
                    {comments && comments.map(({ commentBody, username, commentDate }, index) => (


                        <div key={index} style={{ border: "solid 2px black", width: "90%", maxWidth: "90%", background: "#e5e5ea" }}
                            id="talk-bubble" className="talk-bubble d-flex flex-column align-items-start  px-3  text-black">
                            <h5>{username == cookies.get("username") ? 'You' : username}</h5>

                            <span className="text-black small text-right my-1 d-flex flex-column"> {commentDate}</span> <br />

                            {commentBody}

                        </div>
                    ))

                    }
                    {allDBcomments && allDBcomments.map((el, id) => (
                        <div style={{ border: "solid 2px rgb(125, 128, 131)", width: "90%", maxWidth: "90%", background: "#e5e5ea"}}
                            id="talk-bubble" className="talk-bubble d-flex flex-column align-items-start  px-3  text-black" key={id}>
                            <h5>{el.username == cookies.get("username") ? 'You' : el.username}</h5>

                            <span className="text-black small text-right my-1 d-flex flex-column"> {el.commentTime}</span> <br />

                            {el.body}</div>
                    ))
                    }
                </div>
            </div>
        </div >
    );
};

export default FilmDetails;