using MovieSite.Models;
using MovieSite.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieCommentsController : Controller
    {
        private readonly MovieCommentsService movieCommentsService;
        private readonly CommentService commentService;
        public MovieCommentsController(MovieCommentsService movieCommentsService, CommentService commentService)
        {
            this.movieCommentsService = movieCommentsService;
            this.commentService = commentService;
        }

        [HttpPost("CreateMovieComment/{movieId}")]
        public async Task<MovieComment> CreateMovieComment(string movieId, Comment comment)
        {
            Comment createdComment = await commentService.Create(comment);
            return await movieCommentsService.CreateMovieComment(movieId, createdComment);
        }

        [HttpGet("GetCommentsByMovieId/{movieId}")]
        public async Task<List<Comment>> GetCommentsByMovieId(string movieId)
        {
            List<MovieComment> movieComment1 = await movieCommentsService.GetMovieComments(movieId);

            return await commentService.GetComments(movieComment1);
        }
    }
}
