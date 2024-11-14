using StoreApi.Entities;
using Stripe;

namespace StoreApi.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;

        public PaymentService( IConfiguration config)
        {
            _config = config;
        }
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:Secretkey"];
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subTotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
            var deliveryfee = subTotal > 10000 ? 0 : 500;
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subTotal + deliveryfee,
                    Currency ="usd",
                    PaymentMethodTypes=new List<string>{ "card"}
                };
                intent=await service.CreateAsync(options);
               
            
            }
            else
            {
                var options = new PaymentIntentUpdateOptions {
                    Amount =subTotal+deliveryfee,
                
                };
                await service.UpdateAsync(basket.PaymentIntentId,options);

            }
            return intent;
        }
    }
}
