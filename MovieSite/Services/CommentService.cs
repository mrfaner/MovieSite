using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace MovieSite.Services
{
    public class CommentService
    {
        IMongoCollection<Comment> Comments;
        public CommentService()
        {
            Comments = DataBaseService.GetMongoCollection<Comment>("Comments");
        }

        public async Task<Comment> Create(Comment comment)
        {
            comment.CommentId = Guid.NewGuid().ToString();

            Comment findMatch = await Comments.Find(x => x.CommentId == comment.CommentId).FirstOrDefaultAsync();

            if (findMatch == null)
            {
                await Comments.InsertOneAsync(comment);
                return comment;
            }

            return new Comment();
        }

        public async Task<List<Comment>> GetComments(List<MovieComment> movieComments)
        {
            List<Comment> comments = new List<Comment>();

            foreach (var item in movieComments)
            {
                Comment findMatch = await Comments.Find(x => x.CommentId == item.CommentId).FirstOrDefaultAsync();

                if (findMatch != null)
                {
                    comments.Add(findMatch);
                }
            }

            return comments;
        }
    }
}
