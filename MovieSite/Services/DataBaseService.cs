using MongoDB.Driver;
using System.Configuration;

namespace MovieSite.Services
{
    public class DataBaseService
    {
        public static IMongoCollection<T> GetMongoCollection<T>(string tableName)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            return database.GetCollection<T>(tableName);
        }
    }
}
