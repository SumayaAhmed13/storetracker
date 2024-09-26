using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Entities;
using StoreApi.Extensions;
using StoreApi.RequestHelpers;
using System.Text.Json;

namespace StoreApi.Controllers
{
   
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext context;

        public ProductsController(StoreContext _context)
        {
            context = _context;
        }
        [HttpGet]
        
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
           var query= context.Products
                     .Sort(productParams.OrderBy)
                     .Search(productParams.SearchTerm)
                     .Filter(productParams.Brands, productParams.Types)
                     .AsQueryable();

           var products = await PagedList<Product>.TotalPageList(query,productParams.PageNumber,productParams.PageSize);

           Response.AddPaginationHeader(products.MetaData);
           return products;
        }

        [HttpGet("{id}")]
     
        public async Task<ActionResult<Product>>GetProduct(int id)
        {
            var product= await context.Products.FindAsync(id);   
            if(product == null) return NotFound();
            return Ok(product);
           
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands= await context.Products.Select(c=>c.Brand).Distinct().ToListAsync();
            var types= await context.Products.Select(c => c.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
