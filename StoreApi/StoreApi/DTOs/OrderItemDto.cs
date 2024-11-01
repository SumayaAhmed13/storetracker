namespace StoreApi.DTOs
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public long Price { get; set; }

    }
}
