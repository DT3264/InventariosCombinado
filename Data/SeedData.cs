using Microsoft.AspNetCore.Identity;
using aspnetcore_react_auth.Models;

namespace aspnetcore_react_auth.Data;

public static class SeedData
{

    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using (var context =
            serviceProvider.GetRequiredService<ApplicationDbContext>())
        {
            // For sample purposes seed both with the same password.
            // Password is set with the following:
            // dotnet user-secrets set SeedUserPW <pw>
            // The admin user can do anything
            var u1 = await EnsureUser(serviceProvider, "Davolio", "ANancy@nwind.com");
            var u2 = await EnsureUser(serviceProvider, "Fuller", "AAndrew@nwind.com");
            var u3 = await EnsureUser(serviceProvider, "Leverling", "AJanet@nwind.com");
            var u4 = await EnsureUser(serviceProvider, "Peacock", "AMargaret@nwind.com");
            var u5 = await EnsureUser(serviceProvider, "Buchanan", "ASteven@nwind.com");
            var u6 = await EnsureUser(serviceProvider, "Suyama", "AMichael@nwind.com");
            var u7 = await EnsureUser(serviceProvider, "King", "ARobert@nwind.com");
            var u8 = await EnsureUser(serviceProvider, "Callahan", "ALaura@nwind.com");
            var u9 = await EnsureUser(serviceProvider, "Dodsworth", "AAnne@nwind.com");
            var u10 = await EnsureUser(serviceProvider, "Davolio", "BNancy@nwind.com");
            var u11 = await EnsureUser(serviceProvider, "Fuller", "BAndrew@nwind.com");
            var u12 = await EnsureUser(serviceProvider, "Leverling", "BJanet@nwind.com");
            var u13 = await EnsureUser(serviceProvider, "Peacock", "BMargaret@nwind.com");
            var u14 = await EnsureUser(serviceProvider, "Buchanan", "BSteven@nwind.com");
            var u15 = await EnsureUser(serviceProvider, "Suyama", "BMichael@nwind.com");
            var u16 = await EnsureUser(serviceProvider, "King", "BRobert@nwind.com");
            var u17 = await EnsureUser(serviceProvider, "Callahan", "BLaura@nwind.com");
            var u18 = await EnsureUser(serviceProvider, "Dodsworth", "BAnne@nwind.com");

            await EnsureRole(serviceProvider, u1, "ADMINISTRADOR");
            await EnsureRole(serviceProvider, u18, "ADMINISTRADOR");
            await EnsureRole(serviceProvider, u2, "GERENTE");
            await EnsureRole(serviceProvider, u3, "GERENTE");
            await EnsureRole(serviceProvider, u4, "GERENTE");
            await EnsureRole(serviceProvider, u5, "GERENTE");
            await EnsureRole(serviceProvider, u6, "GERENTE");
            await EnsureRole(serviceProvider, u7, "GERENTE");
            await EnsureRole(serviceProvider, u8, "GERENTE");
            await EnsureRole(serviceProvider, u9, "GERENTE");
            await EnsureRole(serviceProvider, u10, "GERENTE");
            await EnsureRole(serviceProvider, u11, "GERENTE");
            await EnsureRole(serviceProvider, u12, "GERENTE");
            await EnsureRole(serviceProvider, u13, "GERENTE");
            await EnsureRole(serviceProvider, u14, "GERENTE");
            await EnsureRole(serviceProvider, u15, "GERENTE");
            await EnsureRole(serviceProvider, u16, "GERENTE");
            await EnsureRole(serviceProvider, u17, "GERENTE");
        }
    }

    private static async Task<string> EnsureUser(IServiceProvider serviceProvider,
                                                string testUserPw, string UserName)
    {
        var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();


        var user = await userManager.FindByNameAsync(UserName);
        if (user == null)
        {
            user = new ApplicationUser
            {
                UserName = UserName,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user, testUserPw);
        }

        if (user == null)
        {
            throw new Exception("The password is probably not strong enough!");
        }

        return user.Id;
    }

    private static async Task<IdentityResult> EnsureRole(IServiceProvider serviceProvider,
                                                                  string uid, string role)
    {
        var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();

        if (roleManager == null)
        {
            throw new Exception("roleManager null");
        }

        IdentityResult IR;
        if (!await roleManager.RoleExistsAsync(role))
        {
            IR = await roleManager.CreateAsync(new IdentityRole(role));
        }

        var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

        //if (userManager == null)
        //{
        //    throw new Exception("userManager is null");
        //}

        var user = await userManager.FindByIdAsync(uid);

        if (user == null)
        {
            throw new Exception("The testUserPw password was probably not strong enough!");
        }

        IR = await userManager.AddToRoleAsync(user, role);

        return IR;
    }
}