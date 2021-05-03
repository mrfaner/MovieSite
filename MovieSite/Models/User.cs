using MongoDB.Bson.Serialization.Attributes;

namespace MovieSite.Models
{
    public class User
    {
        [BsonId]
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        public string Image { get; set; }

        public string Login { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        [BsonIgnoreIfNull]
        public bool Role { get; set; }

        [BsonIgnoreIfNull]
        public string UserWatchList { get; set; }
    }
}
