using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
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

        public async Task Create(MovieComment movieComment)
        {
            await MovieComments.InsertOneAsync(movieComment);
        }

        public async Task<MovieComment> GetMovieComment(string id)
        {
            return await MovieComments.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddMovieComment(MovieComment movieComment)
        {
            await MovieComments.InsertOneAsync(movieComment);
        }

        public async Task UpdateMovieComments(MovieComment movieComment)
        {
            await MovieComments.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(movieComment.MovieId)), movieComment);
        }

        public async Task DeleteMovieComments(string id)
        {
            await MovieComments.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }

    }
}
