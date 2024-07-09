namespace StoreApi.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public void AddItem(Product product,int qty)
        {
            if (Items.All(item=>item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = qty });
            }
            var existItems = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existItems != null) existItems.Quantity += qty;
        }
        public void RemoveItem(int productId, int qty)
        {
            var existItems = Items.FirstOrDefault(i => i.ProductId == productId);
            if(existItems==null) return;
            existItems.Quantity -= qty;
            if(existItems.Quantity==0) Items.Remove(existItems);
        
        }
    }
}
