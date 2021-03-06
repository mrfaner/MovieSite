using MovieSite.Models;
using MovieSite.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserService userService;
        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<User> Create(User user)
        {
            return await userService.Create(user);
        }

        [HttpGet("GetUserById/{userId}")]
        public async Task<User> GetUserById(string userId)
        {
            return await userService.GetUserById(userId);
        }

        [HttpGet("{login},{password}")]
        public async Task<User> GetUser(string login, string password)
        {
            return await userService.LogIn(login, password);
        }

        [HttpPut]
        public async Task DeleteUser(string id)
        {
            await userService.DeleteUser(id);
        }

        [HttpPut("ChangeUserData/{fieldName}/{userId}, {newData}")]
        public async Task<User> ChangeUserData(string fieldName, string userId, string newData)
        {
            return await userService.ChangeUserData(fieldName, userId, newData);
        }

        [HttpPost("ChangeUserData/Image/")]
        public async Task<User> ChangeUserDataImage(User user)
        {
            return await userService.ChangeUserDataImage(user);
        }

        [HttpPost("ChangeUserData/ArrayLater/")]
        public async Task<User> ChangeUserDataArrays(User user)
        {
            return await userService.ChangeUserDataArrayWatchLater(user);
        }

        [HttpPost("ChangeUserData/Array/")]
        public async Task<User> ChangeUserDataArrayWatch(User user)
        {
            return await userService.ChangeUserDataArrayWatch(user);
        }
        [HttpPost("GetUserData/{userId}")]
        public async Task<User> GetUserData(string userId)
        {
            return await userService.GetUserData(userId);
        }

    }

}
