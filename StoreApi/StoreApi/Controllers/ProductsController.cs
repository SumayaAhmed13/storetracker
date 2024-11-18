using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.DTOs;
using StoreApi.Entities;
using StoreApi.Extensions;
using StoreApi.RequestHelpers;
using StoreApi.Services;
using System.Text.Json;

namespace StoreApi.Controllers
{
   
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context,IMapper mapper,ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }
        [HttpGet]
        
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
           var query= _context.Products
                     .Sort(productParams.OrderBy)
                     .Search(productParams.SearchTerm)
                     .Filter(productParams.Brands, productParams.Types)
                     .AsQueryable();

           var products = await PagedList<Product>.TotalPageList(query,productParams.PageNumber,productParams.PageSize);

           Response.AddPaginationHeader(products.MetaData);
           return products;
        }

        [HttpGet("{id}",Name= "GetProduct")]
     
        public async Task<ActionResult<Product>>GetProduct(int id)
        {
            var product= await _context.Products.FindAsync(id);   
            if(product == null) return NotFound();
            return Ok(product);
           
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands= await _context.Products.Select(c=>c.Brand).Distinct().ToListAsync();
            var types= await _context.Products.Select(c => c.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>>CreateProduct([FromForm]CreateProductDto productDto)
        {
            var product=_mapper.Map<Product>(productDto);
            if (productDto.File !=null)
            {
                var imageResult=await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }
                product.ImageUrl=imageResult.SecureUrl.ToString();
                product.PublicId=imageResult.PublicId;
            }
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);
           
             return BadRequest(new ProblemDetails{Title="Problem to creating new Product"});

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            var product= await _context.Products.FindAsync(productDto.Id);

            if (product == null) return NotFound();
            _mapper.Map(productDto, product);
            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }
                if(!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }
                product.ImageUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;

            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(product);
            return BadRequest(new ProblemDetails { Title = "Problem to updated Product by  id" });

        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product= await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await _imageService.DeleteImageAsync(product.PublicId);
            }
            _context.Products.Remove(product);
            var result= await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem to Delete Product by  id" });
        }

    }
}
