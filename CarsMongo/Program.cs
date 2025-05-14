using CarsMongo.Models;
namespace CarsMongo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var AllowOrigins = "_myAllowOrigins";

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.Configure<CarsDbContext>(
            builder.Configuration.GetSection("CarsCollectionDB"));
            

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: AllowOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200") 
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors(AllowOrigins);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
