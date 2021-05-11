import React, { useCallback, useEffect, useState } from "react";
import "./Comment.css";
import logo from './../../../Profile/DefAvatar.jpg';

function Comment({ comment, userId, updateList }) {

    const [userIcon, setUserIcon] = useState();
    const [userName, setUserName] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "api/users/GetUserById/" + comment.userId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                let responseUser = JSON.parse(xhr.responseText);
                setUserIcon(responseUser.image ? responseUser.image : logo);
                setUserName(responseUser.firstName + " " + responseUser.lastName);
            }
        };
        xhr.send();
    }, [comment]);

    const deleteCommentHandler = useCallback(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("put", "api/comments/DeleteComment/" + comment.commentId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                updateList();
            }
        };
        xhr.send(comment.commentId);
    }, [comment.commentId, updateList]);
    return (
        // <div className="comment">
        //     <img className="comment-user-icon" src={userIcon} style={{ margin: 0 }} />
        //     <div className="comment-user-name">
        //         {userName}
        //     </div>
        //     <div className="comment-data">
        //         {comment?.dateTime.replace("T", " ").replace("Z", "")}
        //     </div>
        //     { userId === comment.userId && (
        //         <div className="comment-remove" onClick={deleteCommentHandler}>&#128465;</div>
        //     )}
        //     <div className="text">
        //         {comment?.text}
        //     </div>
        // </div>

        <div className="comment">
            <table className="table">
                <tbody>
                    <tr className="tr1">
                        <td rowSpan="2" className="imageCell">
                            <img className="comment-user-icon" src={userIcon} alt="Deleted User" style={{ margin: 0 }} />                    </td>
                        <td className="nameCell">
                            <div className="comment-user-name">
                                {userName}
                            </div>
                        </td>
                        <td className="comment-data">
                            <div className="commentData">
                                {
                                    (() => {
                                        if (comment) {
                                            let temp = comment?.dateTime.replace("T", " ").replace("Z", "");
                                            let to = temp.search(':') + 3;
                                            return temp.substring(0, to);
                                        }
                                    })()
                                }
                            </div>
                        </td>
                        <td className="commentText">
                            {(userId === comment.userId || user?.role) && (
                                <div className="comment-remove" onClick={deleteCommentHandler}>&#128465;</div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <div className="text">
                                {comment?.text}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Comment