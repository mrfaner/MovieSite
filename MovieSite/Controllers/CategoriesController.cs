using MovieSite.Models;
using MovieSite.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MovieSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CategoryService categoryService;
        public CategoriesController(CategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            if (ModelState.IsValid)
            {
                await categoryService.Create(category);
                return RedirectToAction("Index");
            }
            return View(category);
        }
    }

}
