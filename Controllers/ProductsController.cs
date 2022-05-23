using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcore_react_auth.Data;
using aspnetcore_react_auth.Models;
using aspnetcore_react_auth.Requests;
using Microsoft.AspNetCore.Identity;

namespace aspnetcore_react_auth.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProductsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<Object> GetProductsWithId()
        {
            var productos = _context.Products
            .Select(p => new { p.ProductId, p.ProductName});
            return productos;
        }
    }
}
