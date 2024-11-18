using AutoMapper;
using StoreApi.DTOs;
using StoreApi.Entities;

namespace StoreApi.RequestHelpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
