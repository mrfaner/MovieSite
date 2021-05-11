import React, { useEffect, useState } from "react";
import "./View.css"
import { useParams } from "react-router-dom"
import { Spinner } from "reactstrap"
import YoutubeEmbed from "./../YoutubeEmbed/YoutubeEmbed";
import noimage from "./../MovieRedactor/no-image.png";
import CommentBlock from "./../CommentBlock/CommentBlock";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";


export function View() {
    const [movie, setMovie] = useState();
    const params = useParams().id
    const [isChanged, setIsChanged] = useState(false)
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

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

    function saveUserToLocal(xhr, user) {
        console.log("test");
        console.log(xhr);
        let temp = JSON.parse(JSON.parse(user));

        console.log(temp.userId);
        if (temp.userId !== null) {
            localStorage.setItem("User", user);
            window.location.reload();
        }
        else {
            alert("Error");
        }
    }

    function deleteMovie() {
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'api/movies/DeleteMovie/' + movie.movieId);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200){
                history.push("/");
            }
        };
        console.log(xhr);
        xhr.send(JSON.stringify(user));
    }

    function addArray(line) {
        if (line === "later" && !user.userWatchLaterList.includes(movie.movieId)) {
            user.userWatchLaterList.push(movie.movieId);
            console.log("pushed");
            if (user.userWatchList.includes(movie.movieId)) {
                let index = user.userWatchList.findIndex(currentValue => currentValue === movie.movieId)
                console.log(index);

                if (index !== -1) {
                    console.log(user.userWatchList);
                    user.userWatchList.splice(index, 1);
                    console.log(user.userWatchList);
                }
            }
        } else if (line === "new" && !user.userWatchList.includes(movie.movieId)) {
            user.userWatchList.push(movie.movieId);
            console.log("pushed");
            if (user.userWatchLaterList.includes(movie.movieId)) {
                let index = user.userWatchLaterList.findIndex(currentValue => currentValue === movie.movieId)
                console.log(index);

                if (index !== -1) {
                    console.log(user.userWatchLaterList);
                    user.userWatchLaterList.splice(index, 1);
                    console.log(user.userWatchLaterList);
                }
            }
        } else if (line === "laterDelete") {
            let index = user.userWatchLaterList.findIndex(currentValue => currentValue === movie.movieId)
            console.log(user.userWatchLaterList);
            user.userWatchLaterList.splice(index, 1);
            console.log(user.userWatchLaterList);
        } else if (line === "newDelete") {
            let index = user.userWatchList.findIndex(currentValue => currentValue === movie.movieId)
            console.log(user.userWatchList);
            user.userWatchList.splice(index, 1);
            console.log(user.userWatchList);

        }
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'api/users/ChangeUserData/ArrayLater/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let responsedUser = JSON.stringify(xhr.responseText);
                saveUserToLocal(xhr, responsedUser);
            }
        };
        console.log(user);
        xhr.send(JSON.stringify(user));
        console.log(xhr);
    }

    console.log(user);
    console.log(movie);
    return (
        <>
            {movie
                ? (
                    <div className="movie-view">
                        <img className="imageView" src={(movie.image.includes("data:image")) ? movie.image : noimage} alt="Dont choose" />
                        <label className="titleLabel">{movie.name}</label>
                        <div className="viewList">
                            {
                                (() => {
                                    if (user && user.userWatchLaterList) {
                                        if (user.userWatchLaterList?.includes(movie.movieId))
                                            return <Button className="viewListBtn" onClick={() => { addArray("laterDelete") }}>Remove from watch later list</Button>
                                        else
                                            return <Button className="viewListBtn" onClick={() => { addArray("later") }}>Add to watch later list</Button>
                                    }
                                })()
                            }
                            {
                                (() => {
                                    if (user && user.userWatchLaterList) {
                                        if (user?.userWatchList?.includes(movie.movieId))
                                            return <Button className="viewListBtn" onClick={() => { addArray("newDelete") }}>Remove from viewed list</Button>
                                        else
                                            return <Button className="viewListBtn" onClick={() => { addArray("new") }}>Add to viewed list</Button>
                                    }
                                })()

                            }
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
                        <div className="deletebtnView">
                            {
                                (() => {
                                    if (user?.role){
                                        return (
                                            <Button className="viewDeletetBtn" onClick={() => { deleteMovie() }}>
                                            Delete this movie
                                        </Button>            
                                        )
                                    }
                                })()
                            }
                        </div>
                        <div className="descriptionBlock">
                            <div className="descriptionField">Description:</div>
                            <label className="viewDescriptionLabel">{movie.description}</label>
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