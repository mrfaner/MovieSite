using MovieSite.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace MovieSite.Services
{
    public class MovieCommentsService
    {
        IMongoCollection<MovieComment> MovieComments;

        public MovieCommentsService()
        {
            MovieComments = DataBaseService.GetMongoCollection<MovieComment>("MovieComments");
        }

        public async Task<MovieComment> CreateMovieComment(string movieId, Comment comment)
        {
            MovieComment movieComment = new MovieComment();
            movieComment.MovieId = movieId;
            movieComment.CommentId = comment.CommentId;
            await MovieComments.InsertOneAsync(movieComment);

            return movieComment;
        }

        public async Task<List<MovieComment>> GetMovieComments(string movieId)
        {
            List<MovieComment> movieComments = await MovieComments.Find(x => x.MovieId == movieId).ToListAsync();

            if (movieComments != null)
            {
                return movieComments;
            }

            return new List<MovieComment>();
        }
    }
}
