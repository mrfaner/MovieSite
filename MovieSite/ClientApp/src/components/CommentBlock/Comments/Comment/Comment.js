import React, { useEffect, useState } from "react";
import "./Comment.css"

export function Comment({ comment }) {
    const [user, setUser] = useState();


    useEffect(() => {
        let xhr = new XMLHttpRequest()
        xhr.open("post", "api/users/GetUserData/" + comment.userId, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setUser(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(user);
    }, [user, setUser])

    console.log(comment);
    return (
        <div className="comment">
            <img src={user?.userId}/>
            <div>
                {user?.firstName} {user?.lastName}
            </div>
            <div>
                {comment.text}
            </div>

        </div>
    )
}

export default Comment
