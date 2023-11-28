using CoffeeHouse_App.Helpers;
using CoffeeHouse_App.Shared.Settings;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var appSettings = builder.Configuration.GetSection("AppSettings");

builder.Services.Configure<AppSettings>(appSettings);
AppSettings appSettingsObject = appSettings.Get<AppSettings>();
var connectionString = appSettingsObject.ConnectionString;

DependencyInjectionHelper.InjectDbContext(builder.Services, connectionString);
DependencyInjectionHelper.InjectRepositories(builder.Services);
DependencyInjectionHelper.InjectServices(builder.Services);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
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
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
