using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using aspnetcore_react_auth.Data;
using aspnetcore_react_auth.Models;
using IdentityModel;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlite(connectionString));

var connectionString = "server=localhost;port=3306;database=northwind;uid=root;password=0000";
var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));
builder.Services.AddDbContext<ApplicationDbContext>(
 dbContextOptions => dbContextOptions.UseMySql(connectionString, serverVersion)
);


builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>
    (options => options.SignIn.RequireConfirmedAccount = true)
         .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
 //  .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
 .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(
    x =>
    {
        x.IdentityResources.Add(new Duende.IdentityServer.Models.IdentityResource(
            "roles", "Roles", new[] { JwtClaimTypes.Role, ClaimTypes.Role }
        ));
        foreach (var c in x.Clients)
        {
            c.AllowedScopes.Add("roles");
        }
        foreach (var a in x.ApiResources)
        {
            a.UserClaims.Add(JwtClaimTypes.Role);
        }
    }
);

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddAuthorization(
        options =>
{
    options.AddPolicy("RequireAdmin", policy =>
    {
        policy.RequireClaim(ClaimTypes.Role, new String[] { "ADMINISTRADOR" });
    });
    options.AddPolicy("RequireGerente", policy =>
    {
        policy.RequireClaim(ClaimTypes.Role, new String[] { "GERENTE" });
    });
}
);


builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// builder.Services.AddScoped<PizzaService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    // requires using Microsoft.Extensions.Configuration;
    // Set password with the Secret Manager tool.
    // dotnet user-secrets set SeedUserPW <pw>

    // var testUserPw = builder.Configuration.GetValue<string>("SeedUserPW");

    await SeedData.Initialize(services, "T3stpass.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
