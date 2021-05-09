import React, { useEffect, useState } from "react";
import "./View.css"
import { useParams } from "react-router-dom"
import { Spinner } from "reactstrap"
import YoutubeEmbed from "./../YoutubeEmbed/YoutubeEmbed";
import noimage from "./../MovieRedactor/no-image.png";
import CommentBlock from "./../CommentBlock/CommentBlock";
import CardText from "reactstrap/lib/CardText";
import Button from "reactstrap/lib/Button";



export function View() {
    const [movie, setMovie] = useState();
    const params = useParams().id
    const [isChanged, setIsChanged] = useState(false)
    const [user, setUser] = useState();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

    function saveUserToLocal(xhr, user) {
        console.log("test");
        console.log(xhr);
        let temp = JSON.parse(JSON.parse(user));

        console.log(temp.userId);
        if (temp.userId !== null) {
            localStorage.setItem("User", user);
            //window.location.reload();
        }
        else {
            alert("Error");
        }
    }

    function addArray(line) {
        if (line === "later") {
            user.userWatchLaterList.push(movie.movieId);
        }
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'api/users/ChangeUserData/Arrays/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let responsedUser = JSON.stringify(xhr.responseText);
                saveUserToLocal(xhr, responsedUser);
            }
        };
        xhr.send(JSON.stringify(user));
        console.log(xhr);
    }

    useEffect(() => {
        if (!movie) {
            let xhr = new XMLHttpRequest()

            xhr.open("get", "api/movies/GetMovieByMovieId/" + params, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.onload = function () {
                if (xhr.status === 200) {
                    setMovie(JSON.parse(xhr.responseText))
                }
            }
            xhr.send()
        }
    }, [movie, params])

    console.log(movie);
    return (
        <>
            {movie
                ? (
                    <div className="movie-view">
                        <img className="imageView" src={(movie.image.includes("data:image")) ? movie.image : noimage} alt="Photo dont choose" />
                        <label className="titleLabel">{movie.name}</label>
                        <div>
                            <Button onClick={() => {
                                addArray("later")
                            }}>
                                Add to watch later
                            </Button>
                        </div>
                        <div className="yearBlock">
                            <div className="yearField">Date: </div>
                            <label className="yearLabel">{movie.year}</label>
                        </div>
                        <div className="countryBlock">
                            <div className="countryField">Country: </div>
                            <label className="countryLabel">{movie.country}</label>
                        </div>
                        <div className="durationBlock">
                            <div className="durationField">Duration: </div>
                            <label className="durationLabel">{movie.duration}</label>
                        </div>
                        <div className="ratingBlock">
                            <div className="ratingField">IMDB Rating: </div>
                            <label className="ratingLabel">{movie.imdbRating}</label>
                        </div>
                        <div className="categoriesBlock">
                            <div className="categoriesField">Categories: </div>
                            <label className="categoriesLabel">
                                {
                                    (() => {
                                        let text = "";
                                        for (let i = 0; i < movie.categories.length; i++) {
                                            text += movie.categories[i] + ", ";
                                        }
                                        text = text.substring(0, text.length - 2);
                                        return text;
                                    })()
                                }
                            </label>
                        </div>
                        <div className="descriptionBlock">
                            <div className="descriptionField">Description:</div>
                            <label className="descriptionLabel">{movie.description}</label>
                        </div>
                        {(movie.trailerLink !== null) ?
                            (
                                <div className="TrailerBlock">
                                    <div className="trailerField">Trailer:</div>
                                    <YoutubeEmbed embedId={movie.trailerLink} />
                                </div>
                            )
                            : (null)
                        }
                        <div className="commentsBlock">
                            <CommentBlock movieId={movie.movieId} isChanged={isChanged} setIsChanged={setIsChanged} />
                        </div>
                    </div>
                )
                : (
                    <>
                        <Spinner className="spinner" />
                    </>
                )}
        </>
    )
}