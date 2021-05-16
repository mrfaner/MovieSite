using MongoDB.Bson.Serialization.Attributes;

namespace MovieSite.Models
{
    public class Movie
    {
        [BsonId]
        public string MovieId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Year { get; set; }

        [BsonIgnoreIfNull]
        public string Image { get; set; }

        public string Country { get; set; }


        public string[] Categories { get; set; }

        public string Duration { get; set; }

        public string IMDBRating { get; set; }

        [BsonIgnoreIfNull]
        public string TrailerLink { get; set; }

    }
}
