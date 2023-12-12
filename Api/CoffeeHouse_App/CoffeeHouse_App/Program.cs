using CoffeeHouse_App.DataAccess;
using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs;
using CoffeeHouse_App.Helpers;
using CoffeeHouse_App.Services.Abstractions;
using CoffeeHouse_App.Services.Implmentations;
using CoffeeHouse_App.Shared.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var appSettings = builder.Configuration.GetSection("AppSettings");
var clientUrl = builder.Configuration.GetValue<string>("CoffeeHouseClient:url");
var originsPolicy = "OriginsPolicy";

var emailConfig = builder.Configuration.GetSection("EmailConfiguration");


builder.Services.Configure<AppSettings>(appSettings);
AppSettings appSettingsObject = appSettings.Get<AppSettings>();
var connectionString = appSettingsObject.ConnectionString;

DependencyInjectionHelper.InjectDbContext(builder.Services, connectionString);
DependencyInjectionHelper.InjectServices(builder.Services);
DependencyInjectionHelper.InjectRepositories(builder.Services);

// Add services to the container.
builder.Services.AddIdentity<User, Role>().AddEntityFrameworkStores<CoffeeHouseDbContext>().AddDefaultTokenProviders();


builder.Services.Configure<IdentityOptions>(options =>
{
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
    options.SignIn.RequireConfirmedEmail = true;

});


// Add Email Configs
var emailConfiguration = emailConfig.Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfiguration);

builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromMinutes(30));


// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

builder.Services.AddScoped<UserManager<User>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
{
    OpenApiSecurityScheme jwtSecurityScheme = new()
    {
        Scheme = "bearer",
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Description = "Use ONLY JWT below!",
        Reference = new OpenApiReference()
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
    setup.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                jwtSecurityScheme,
                Array.Empty<string>()
            }
        });
}
);

// Register the IdentityDbContext 
//builder.Services.AddDbContext<CoffeeHouseDbContext>(options => 
//    options.UseSqlServer(connectionString));

builder.Services.AddDbContext<CoffeeHouseDbContext>(options => options.UseSqlServer(connectionString), ServiceLifetime.Transient);

builder.Services.AddAuthentication();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    DataInitializer.Initialize(service);
}
// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseCors(originsPolicy);
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
