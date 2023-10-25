using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using shopnutravia.Models;
using shopnutravia.Services;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ShopnutraviaDBContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("ShopnutraviaDBContext"),
       sqlServerOptionsAction: sqlOptions => {
           sqlOptions.EnableRetryOnFailure();
       })
   );//Add DB Context

builder.Services.AddScoped<IGiftCodeService, GiftCodeService>();//Dependency Injection
builder.Services.AddScoped<IGiftCodeClaimService, GiftCodeClaimService>();//Dependency Injection

builder.Services.AddSingleton<AppSettingModel>(builder.Configuration.Get<AppSettingModel>());

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
//builder.Services.AddMvc(options =>
//{
//    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
//});
var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
