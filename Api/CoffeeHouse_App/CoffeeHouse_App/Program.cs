using CoffeeHouse_App.Helpers;
using CoffeeHouse_App.Shared.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var appSettings = builder.Configuration.GetSection("AppSettings");

builder.Services.Configure<AppSettings>(appSettings);
AppSettings appSettingsObject = appSettings.Get<AppSettings>();
var connectionString = appSettingsObject.ConnectionString;

DependencyInjectionHelper.InjectDbContext(builder.Services, connectionString);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
