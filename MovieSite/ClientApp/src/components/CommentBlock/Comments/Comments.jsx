import React from "react"
import "./Comments.css"
import Comment from "./Comment/Comment";


function Comments({comments, userId, updateList}) {

    return (
        <div className="comment-list">
            <>
            {comments?.length > 0 && (
                <>
                    {
                        comments?.map((comment, index) => {
                            return (
                                <Comment userId = {userId}
                                         key={index}
                                         comment={comment}
                                         updateList={updateList}
                                />
                            )
                        })}
                </>
            )
            }
            </>
        </div>
    )

}

export default Comments