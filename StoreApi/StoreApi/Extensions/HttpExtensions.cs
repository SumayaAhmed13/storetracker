using Microsoft.AspNetCore.Http;
using StoreApi.Entities;
using StoreApi.RequestHelpers;
using System.Text.Json;

namespace StoreApi.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse httpResponse, MetaData metaData)
        {
            var options=new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            httpResponse.Headers.Append("Pagination", JsonSerializer.Serialize(metaData,options));
            httpResponse.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
