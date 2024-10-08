﻿
using StoreApi.Entities;

namespace StoreApi.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query,string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p=>p.Name);
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDec" => query.OrderByDescending(query => query.Price),
                _ => query.OrderBy(query => query.Name),
            };
            return  query;

        }

        public static IQueryable<Product>Search(this IQueryable<Product> query,string searchTerm) 
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerSerchTerm= searchTerm.Trim().ToLower();

            return query.Where(c => c.Name.ToLower().Contains(lowerSerchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query,string brands,string types)
        {
            var brandList =new List<string>();
            var typeList=new List<string>();

            if (!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(',').ToList());

            if (!string.IsNullOrEmpty(types))
                typeList.AddRange(types.ToLower().Split(',').ToList());

            query = query.Where(c=>brandList.Count==0 ||brandList.Contains(c.Brand.ToLower()));
            query = query.Where(c => typeList.Count == 0 || typeList.Contains(c.Type.ToLower()));

            return query;
        }
    }
}
