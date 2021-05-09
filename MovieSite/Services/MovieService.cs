using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MovieSite.Services
{
    public class MovieService
    {
        private readonly IMongoCollection<Movie> Movies;
        public MovieService()
        {
            Movies = DataBaseService.GetMongoCollection<Movie>("Movie");
        }

        public async Task<Movie> Create(Movie Movie)
        {
            Movie.MovieId = Guid.NewGuid().ToString();
            List<Movie> findMovie = await Movies.Find(x => x.MovieId == Movie.MovieId).ToListAsync();

            if (findMovie.Count == 0)
            {
                await Movies.InsertOneAsync(Movie);
                return Movie;
            }

            return new Movie();
        }

        public async Task<List<Movie>> GetMoviesByTitle(string name)
        {
            Regex regex = new Regex(@$"[\s\S]*{name}[\s\S]*", RegexOptions.IgnoreCase);
            var filter = Builders<Movie>.Filter.Regex(x => x.Name, new BsonRegularExpression(regex));
            List<Movie> movies = await Movies.Find(filter).ToListAsync();
            return movies;

        }

        public async Task<Movie> GetMovieByMovieId(string movieId)
        {
            return await Movies.Find(x => x.MovieId == movieId).FirstOrDefaultAsync();
        }

        public async Task<List<Movie>> GetMovies()
        {
            return await Movies.Find(x => true).ToListAsync();
        }

        public async Task<List<Movie>> GetMovies(string firstNumber, string secondNumber)
        {
            int first = Convert.ToInt32(firstNumber);
            int second = Convert.ToInt32(secondNumber);

            return await Movies.Find(x => true).Skip(first).Limit(second - first).ToListAsync();
        }
        public async Task<List<Movie>> GetMoviesSearch(string title, string category, string sort)
        {
            FilterDefinition<Movie> filter = null;
            if (!title.Equals("0"))
            {
                Regex regex = new Regex(@$"[\s\S]*{title}[\s\S]*", RegexOptions.IgnoreCase);
                filter = Builders<Movie>.Filter.Regex(x => x.Name, new BsonRegularExpression(regex));
                if (!category.Equals("0"))
                {
                    filter &= Builders<Movie>.Filter.AnyEq(x => x.Categories, category);
                }
            }
            else if (!category.Equals("0"))
            {
                filter = Builders<Movie>.Filter.AnyEq(x => x.Categories, category);
            }
            try
            {
                switch (sort)
                {
                    default:
                        {
                            var TestSort1 = Builders<Movie>.Sort.Ascending("Name");
                            return await Movies.Find(filter).Sort(TestSort1).ToListAsync();
                        }
                    case "2":
                        {
                            var TestSort1 = Builders<Movie>.Sort.Descending("Name");
                            return await Movies.Find(filter).Sort(TestSort1).ToListAsync();
                        }
                    case "3":
                        {
                            var TestSort1 = Builders<Movie>.Sort.Ascending("IMDBRating");
                            return await Movies.Find(filter).Sort(TestSort1).ToListAsync();
                        }
                    case "4":
                        {   
                            var TestSort1 = Builders<Movie>.Sort.Descending("IMDBRating");
                            return await Movies.Find(filter).Sort(TestSort1).ToListAsync();
                        }
                }
            }
            catch
            {
                return null;
            }
        }

        public async Task UpdateMovie(Movie movie)
        {
            await Movies.ReplaceOneAsync(x => x.MovieId == movie.MovieId, movie);
        }

        public async Task DeleteMovie(string id)
        {
            await Movies.DeleteOneAsync(x => x.MovieId == id);
        }
    }
}
