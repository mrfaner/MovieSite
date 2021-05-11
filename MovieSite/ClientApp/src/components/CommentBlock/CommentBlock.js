import React, { useEffect, useRef, useState } from "react"
import { TextField } from "@material-ui/core"
import "./CommentBlock.css"
import Comments from "./Comments/Comments";
import Button from "reactstrap/lib/Button";

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

function CommentBlock({ movieId }) {

    const [comments, setComments] = useState()
    const userId = useRef()
    const [rating] = useState(0)
    const commentText = useFormField()

    useEffect(() => {
        if (!comments) {
            userId.current = JSON?.parse(JSON?.parse(localStorage?.getItem("User")))?.userId

            let xhr = new XMLHttpRequest()

            xhr.open("get", "api/moviecomments/GetCommentsByMovieId/" + movieId, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.onload = function () {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText)
                    console.log(response)
                    setComments(response)
                }
            }
            xhr.send()
            console.log(xhr)
        }
    }, [comments, movieId])

    function updateList() {
        let xhr = new XMLHttpRequest()

        xhr.open("get", "api/moviecomments/GetCommentsByMovieId/" + movieId, true)
        xhr.setRequestHeader("Content-Type", "application/json")

        xhr.onload = function () {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText)
                console.log(response)
                setComments(response)
            }
        }
        xhr.send()
    }

    function addComment() {

        if (commentText.get() && commentText.get().length > 1) {
            let xhr = new XMLHttpRequest()

            let comment = JSON.stringify({
                CommentId: "",
                UserId: userId.current,
                DateTime: new Date().toJSON(),
                Text: commentText.get(),
                Rating: rating
            })

            xhr.open("post", "api/moviecomments/CreateMovieComment/" + movieId, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.onload = function () {
                if (xhr.status === 200) {
                    updateList()
                    let response = JSON.parse(xhr.responseText)
                    console.log(response)
                    setComments(response)
                }
            }
            xhr.send(comment)
            console.log(xhr)
        }
    }

    return (
        <div className="comments-block">
            <div className="commentsTitle">
                Comments:
            </div>
            {userId.current && (
                <div className="new-comment-container">
                    <TextField style={{ border: "1px solid black" }} className="comment-input"
                        placeholder="   Comment text"
                        multiline
                        rowsMax={4}
                        {...commentText.bind} />
                    <Button className="comment-add"
                        onClick={addComment}>
                        Add
                    </Button>
                </div>
            )}
            <div className="comment-list-container">
                <Comments userId={userId.current} comments={comments} updateList={updateList} />
            </div>
        </div>
    )
}

export default CommentBlock