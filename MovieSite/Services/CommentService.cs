using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace MovieSite.Services
{
    public class CommentService
    {
        IMongoCollection<Comment> Comments;
        public CommentService()
        {
            Comments = DataBaseService.GetMongoCollection<Comment>("Comments");
        }

        public async Task Create(Comment comment)
        {
            await Comments.InsertOneAsync(comment);
        }

        public async Task<Comment> GetComment(string id)
        {
            return await Comments.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddComment(Comment comment)
        {
            await Comments.InsertOneAsync(comment);
        }

        public async Task DeleteComment(string id)
        {
            await Comments.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
