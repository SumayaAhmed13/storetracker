﻿using Microsoft.AspNetCore.Identity;

namespace StoreApi.Entities
{
    public class User:IdentityUser<int>
    {
        public UserAddress Address  { get; set; }
    }
}
