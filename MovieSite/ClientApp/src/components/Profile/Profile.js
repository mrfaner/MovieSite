import React, { useEffect, useState } from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import { useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import MovieCardListWithoutShowMore from "./../MovieCard/MovieCardListWithoutShowMore";

export function Profile() {
    const history = useHistory();
    const [user, setUser] = useState();
    const [isLater, SetIsLater] = React.useState(false);
    const [movieList, setMovieList] = useState();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])


    function ChooseTab(line) {
        switch (line) {
            case "Later": {
                console.log(user)
                SetIsLater(true);
                let xhr = new XMLHttpRequest();
                let string = "api/movies/GetWatchLaterList/" + user.userId;
                xhr.open("get", string, true);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setMovieList(JSON.parse(xhr.responseText));
                    }
                };
                xhr.send();
                console.log(xhr);
                break;
            }
            case "Watch": {
                SetIsLater(false);
                let xhr = new XMLHttpRequest();
                let string = "api/movies/GetWatchList/" + user.userId;
                xhr.open("get", string, true);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setMovieList(JSON.parse(xhr.responseText));
                    }
                };
                xhr.send();
                console.log(xhr);
                break;
            }
            default: {
                break;
            }
        }
    }
    if (user) {
        return (
            <div>
                <div className="profile-box">
                    <div className="heading">Profile</div>
                    <img className="avatar" src={user.image ? user.image : logo} alt="Logo" />
                    <div className="names">{user.firstName + ' ' + user.lastName}</div>
                    <Button className="addNewsButton" onClick={() => { history.push("/Redactor/" + user.userId) }}>AddNews</Button>
                </div>
                <div className="buttonblock">
                    <Button onClick={() => ChooseTab("Later")} className={isLater ? "btnNonActive" : " btnActive"}>
                        Watch later list
            </Button>
                    <Button onClick={() => ChooseTab("Watch")} className={isLater ? " btnActive" : "btnNonActive"}>
                        Viewed list
            </Button>
                </div>
                {
                    movieList ? (
                        <div>
                            <MovieCardListWithoutShowMore MovieList={movieList} />
                        </div>
                    ) : null
                }
            </div>
        )
    } else {
        return (
            <div>loading</div>
        )
    }

    /*<div className="profile-box">
        <div className ="heading">Profile</div>
        <img className="avatar" src={logo} alt="Logo" />
        <div className="names">{user.FirstName + ' ' + user.LastName}</div>
        <div className="your-movies">Your movie`s</div>
        <div className="movieListArea">
            <MovieCardList MovieList={movieList} />
        </div>
    </div>*/


}