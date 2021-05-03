using MovieSite.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieSite.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> Users;
        public UserService()
        {
            Users = DataBaseService.GetMongoCollection<User>("Users");
        }

        public async Task<User> Create(User user)
        {
            user.UserId = Guid.NewGuid().ToString();
            List<User> foundUser = await Users.Find(x => x.Login == user.Login ||
                x.Email == user.Email).ToListAsync();

            if (foundUser.Count == 0)
            {
                await Users.InsertOneAsync(user);
                return user;
            }

            return new User();
        }

        public async Task<User> LogIn(string login, string password)
        {
            List<User> foundUser = await Users.Find(x => x.Login == login &&
                x.Password == password).ToListAsync();

            if (foundUser.Count == 0)
            {
                return new User();
            }

            return foundUser[0];
        }

        public async Task<User> ChangeUserData(string fieldName, string userId, string newData)
        {
            var filter = Builders<User>.Filter.Eq(x => x.UserId, userId);

            var update = Builders<User>.Update.Set(x => x.UserId, userId);

            switch (fieldName)
            {
                case "Email":
                    update = update.Set(x => x.Email, newData);
                    break;
                case "Password":
                    update = update.Set(x => x.Password, newData);
                    break;
                case "FirstName":
                    update = update.Set(x => x.FirstName, newData);
                    break;
                case "LastName":
                    update = update.Set(x => x.LastName, newData);
                    break;
            }

            await Users.UpdateOneAsync(filter, update);

            List<User> foundUser = await Users.Find(x => x.UserId == userId).ToListAsync();

            if (foundUser.Count == 0)
            {
                return new User();
            }

            return foundUser[0];

        }
        public async Task UpdateUser(User user)
        {
            await Users.ReplaceOneAsync(x => x.UserId == user.UserId, user);
        }

        public async Task DeleteUser(string id)
        {
            await Users.DeleteOneAsync(x => x.UserId == id);
        }
    }
}
