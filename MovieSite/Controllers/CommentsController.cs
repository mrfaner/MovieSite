using MovieSite.Models;
using MovieSite.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly CommentService commentService;
        public CommentsController(CommentService commentService)
        {
            this.commentService = commentService;
        }
    }
}
