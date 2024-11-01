using Microsoft.EntityFrameworkCore;

namespace StoreApi.Entities.OrderAggregate
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }

    }
}
