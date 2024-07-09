using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Text.Json;

namespace StoreApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
           _next = next;
           _env = env;
           _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context) {
            try
            {
                await _next(context);

            }
            catch(Exception ex) {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;
                var response = new ProblemDetails {
                    Status=500,
                    Detail=_env.IsDevelopment()?ex.StackTrace : null,
                    Title=ex.Message
                };
                var options= new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json=JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);

            }


        }

    }
}
