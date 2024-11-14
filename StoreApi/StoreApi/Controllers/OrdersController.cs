using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.DTOs;
using StoreApi.Entities;
using StoreApi.Entities.OrderAggregate;
using StoreApi.Extensions;

namespace StoreApi.Controllers
{

    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(c => c.BuyerId == User.Identity.Name)
                .ToListAsync();
        }
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(c => c.BuyerId == User.Identity.Name && c.Id == id)
                .FirstOrDefaultAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                .RetriveBasketsWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();
            if (basket==null)
            {
                return BadRequest(new ProblemDetails { Title = "Could not locate basket" });
            }
            var items=new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                { ProductId=productItem.Id,
                Name=productItem.Name,
                ImageUrl=productItem.ImageUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered= itemOrdered,
                    Price=productItem.Price,
                    Quantity=item.Quantity
                };
                items.Add(orderItem);
                productItem.StockInQuantity -= item.Quantity;

            }
            var subTotal=items.Sum(x => x.Price * x.Quantity);
            var deliveryfee = subTotal > 10000 ? 0 : 500;

            var order = new Order
            {
                OrderItems= items,
                BuyerId=User.Identity.Name,
                ShippingAddress=orderDto.ShippingAddress,
                Subtotal=subTotal,
                DeliveryFee=deliveryfee,
                PaymentIntentId=basket.PaymentIntentId,

            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);
            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                          .Include(a=>a.Address)
                          .FirstOrDefaultAsync(v=>v.UserName==User.Identity.Name);
                var address = new UserAddress
                { 
                    FullName=orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    State = orderDto.ShippingAddress.State,
                    City = orderDto.ShippingAddress.City,
                    Zip= orderDto.ShippingAddress.Zip,
                    Country = orderDto.ShippingAddress.Country,
                };
                user.Address = address;
               

            }
            var result=await _context.SaveChangesAsync()>0;
            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem Creating in Order");
        }
    }
}
