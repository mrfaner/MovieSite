import React, { useEffect, useState } from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import { useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import MovieCardListWithoutShowMore from "./../MovieCard/MovieCardList";

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
                if (isLater) {
                    SetIsLater(true);
                }
                break;
            }
            case "Watch": {
                if (!isLater) {
                    SetIsLater(false);
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    return (
        <>
            {user
                ? (
                    <div>
                        <div className="profile-box">
                            <div className="heading">Profile</div>
                            <img className="avatar" src={user.image ? user.image : logo} alt="Logo" />
                            <div className="names">{user.firstName + ' ' + user.lastName}</div>
                            <button onClick={() => { history.push("/Redactor/" + user.userId) }}>AddNews</button>
                        </div>
                        <div className="formPicker">
                            <Button onClick={() => ChooseTab("Later")} className={isLater ? "nonActive" : " active"}>
                                Watch later list
                                </Button>
                            <Button onClick={() => ChooseTab("Watch")} className={isLater ? " active" : "nonActive"}>
                                Viewed list
                                </Button>
                        </div>
                        <div>
                            <MovieCardListWithoutShowMore MovieList={movieList}
                            />
                        </div>

                    </div>
                )
                : (
                    <div>loading</div>
                )
            }

        </>

        /*<div className="profile-box">
            <div className ="heading">Profile</div>
            <img className="avatar" src={logo} alt="Logo" />
            <div className="names">{user.FirstName + ' ' + user.LastName}</div>
            <div className="your-movies">Your movie`s</div>
            <div className="movieListArea">
                <MovieCardList MovieList={movieList} />
            </div>
        </div>*/
    );

}