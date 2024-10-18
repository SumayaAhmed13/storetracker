namespace StoreApi.DTOs
{
    public class UserDto
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public BasketDto Basket  { get; set; }

    }
}
