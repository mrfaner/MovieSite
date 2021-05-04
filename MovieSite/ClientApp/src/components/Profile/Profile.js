import React, { useEffect, useState} from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import {useHistory} from "react-router-dom";

export function Profile() {
    const history = useHistory();
    const [user,setUser] = useState();

    useEffect(()=>{
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    },[user])

    return (
        <>
            {user
                ? (
                    <div className="profile-box">
                        <div className ="heading">Profile</div>
                        <img className="avatar" src={logo} alt="Logo" /><br />
                        <div className="names">{user.firstName + ' ' + user.lastName}</div>
                        <button onClick={()=>{history.push("/Redactor/" + user.userId)}}>AddNews</button>
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
            <div className="your-articles">Your article`s</div>
            <div className="articleListArea">
                <ArticleCardList ArticleList={articleList} />
            </div>
        </div>*/
    );

}