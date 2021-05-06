import React from "react"
import "./Comments.css"
import Comment from "./Comment/Comment";


function Comments({ comments }) {
    console.log(comments)
    return (
        <div className="comment-list">
            {comments?.length > 0 && (
                <>
                    {
                        comments?.map((comment, index) => {
                            return (
                                <Comment key={index}
                                    comment={comment} />
                            )
                        })
                    }
                </>
            )
            }
        </div>
    )

}

export default Comments