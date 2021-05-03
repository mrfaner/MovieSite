using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace MovieSite.Services
{
    public class CategoryService
    {
        IMongoCollection<Category> Categories;
        public CategoryService()
        {
            Categories = DataBaseService.GetMongoCollection<Category>("Categories");
        }

        public async Task Create(Category category)
        {
            await Categories.InsertOneAsync(category);
        }

        public async Task<Category> GetCategories(string id)
        {
            return await Categories.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddCategory(Category category)
        {
            await Categories.InsertOneAsync(category);
        }

        public async Task UpdateCategory(Category category)
        {
            await Categories.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(category.CategoryId)), category);
        }

        public async Task DeleteCategory(string id)
        {
            await Categories.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
