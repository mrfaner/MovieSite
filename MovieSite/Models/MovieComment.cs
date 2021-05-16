using MongoDB.Bson.Serialization.Attributes;

namespace MovieSite.Models
{
    public class MovieComment
    {
        [BsonId]
        public string CommentId { get; set; }
        public string MovieId { get; set; }

    }
}
