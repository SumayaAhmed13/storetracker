using StoreApi.DTOs;
using StoreApi.Entities;

namespace StoreApi.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
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
    }
}
