using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace MovieSite.Models
{
    public class Comment
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string CommentId { get; set; }

        public string UserId { get; set; }

        public DateTime DateTime { get; set; }

        public string Text { get; set; }
    }
}
