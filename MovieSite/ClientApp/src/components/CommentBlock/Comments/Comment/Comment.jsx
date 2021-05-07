import React, { useCallback, useEffect, useState } from "react";
import "./Comment.css";
import logo from './../../../Profile/DefAvatar.jpg';

function Comment({ comment, userId, updateList }) {

    const [userIcon, setUserIcon] = useState();
    const [userName, setUserName] = useState();

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "api/users/GetUserById/" + comment.userId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                let responseUser = JSON.parse(xhr.responseText);
                console.log(responseUser);
                setUserIcon(responseUser.image ? responseUser.image : logo);
                setUserName(responseUser.firstName + " " + responseUser.lastName);
            }
        };
        console.log(xhr);
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
    }, [comment.commentId]);
    console.log(comment);
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
                <tr className="tr1">
                    <td rowSpan="2" className="imageCell">
                        <img className="comment-user-icon" src={userIcon} style={{ margin: 0 }} />                    </td>
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
                                        let from = temp.search(':')+3;
                                        let to = temp.legth;
                                        return temp.substring(0,from);
                                    }
                                })()
                            }
                        </div>
                    </td>
                    <td className="commentText">
                        {userId === comment.userId && (
                            <div className="comment-remove" onClick={deleteCommentHandler}>&#128465;</div>
                        )}
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div className="text">
                            {comment?.text}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Comment