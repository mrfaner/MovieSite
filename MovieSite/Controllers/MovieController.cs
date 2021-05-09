using MovieSite.Models;
using MovieSite.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly MovieService movieService;
        public MoviesController(MovieService movieService)
        {
            this.movieService = movieService;
        }

        [HttpPost]
        public async Task<Movie> Create(Movie movie)
        {
            return await movieService.Create(movie);
        }

        [HttpGet]
        public async Task<List<Movie>> GetMovies()
        {
            return await movieService.GetMovies();
        }

        [HttpGet("{firstNumber},{secondNumber}")]
        public async Task<List<Movie>> GetMovies(string firstNumber, string secondNumber)
        {
            return await movieService.GetMovies(firstNumber, secondNumber);
        }

        [HttpGet("GetMovieSearch/{title},{category}/{sort}")]
        public async Task<List<Movie>> GetMoviesSearch(string title, string category, string sort)
        {
            return await movieService.GetMoviesSearch(title, category, sort);
        }

        [HttpGet("GetMovieByMovieId/{movieId}")]
        public async Task<Movie> GetMovieByMovieId(string movieId)
        {
            return await movieService.GetMovieByMovieId(movieId);
        }

        [HttpGet("GetMoviesByTitle/{title}")]
        public async Task<List<Movie>> GetMoviesByTitle(string title)
        {
            return await movieService.GetMoviesByTitle(title);
        }
    }

}
