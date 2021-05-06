using MongoDB.Bson.Serialization.Attributes;

namespace MovieSite.Models
{
    public class MovieComment
    {
        [BsonId]
        public string MovieId { get; set; }

        public string[] CommentId { get; set; }
    }
}
