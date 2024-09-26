using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.DTOs;
using StoreApi.Entities;

namespace StoreApi.Controllers
{
   
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
           _context = context;
        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }
        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Description = x.Product.Description,
                    Price = x.Product.Price,
                    Quantity = x.Quantity,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type,
                    ImageUrl = x.Product.ImageUrl

                }).ToList(),
            };
        }
        //api/basket?productId=3&quantity=2
        [HttpPost]
        
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //create basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails {Title="Product not found" });
            //add item
            basket.AddItem(product,quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            //if (result) return StatusCode(201);
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
      
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket= await RetrieveBasket();
            if (basket == null) return NotFound();

            //remove or reduce item from basket
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if(result)return Ok();
            return BadRequest(new ProblemDetails {Title= "Problem Deleting item to basket" });

        }
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

           
        }
        private Basket CreateBasket()
        {
           var buyerId= Guid.NewGuid().ToString();
           var cookiesOptions=new CookieOptions { IsEssential=true,Expires=DateTime.Now.AddDays(30),Secure=true,HttpOnly=true};
            Response.Cookies.Append("buyerId", buyerId,cookiesOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}
