using aspnetcore_react_auth.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using aspnetcore_react_auth.Models;
using Microsoft.AspNetCore.Identity;

namespace aspnetcore_react_auth.Controllers;

//[Authorize]
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;


    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public WeatherForecastController(ILogger<WeatherForecastController> logger,
    ApplicationDbContext context,
    UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

    [HttpGet]
    [Route("ByCompany")]
    public IEnumerable<Object> GetEmployeesByCompany()
    {
        return _context.Employees
            .GroupBy(e => e.CompanyId)
            .Select(e => new
            {
                Company = e.Key,
                Empleados = e.Count()
            });

    }

    // GET: api/
    [HttpGet]
    // [Authorize(Policy = "RequireAdmin")]
    [AllowAnonymous]
    [Route("top5Vendedores/{year}")]
    public IEnumerable<Object> GetTop5Vendendores(int year)
    {
        return _context.Employees
            .Where(e => e.CompanyId == 1)
            .Join(_context.Movements,
            e => e.EmployeeId,
            m => m.EmployeeId,
            (e, m) => new
            {
                Empleado = e.FirstName + " " + e.LastName,
                IdMovimiento = m.MovementId,
                Anio = m.Date.Year
            })
            .Where(em => em.Anio == year)
            .Join(_context.Movementdetails,
            em => em.IdMovimiento,
            md => md.MovementId,
            (em, md) => new
            {
                Empleado = em.Empleado,
                Cantidad = md.Quantity
            })
            .GroupBy(e => e.Empleado)
            .Select(e => new
            {
                Empleado = e.Key,
                Ventas = e.Sum(g => g.Cantidad)
            });

    }

    [HttpGet]
    // [Authorize(Policy = "RequireAdmin")]
    [AllowAnonymous]
    [Route("top5productos/{year}")]
    public IEnumerable<Object> GetTop5Ventas(int year)
    {
        var topVentas = _context.Movements
        .Join(_context.Movementdetails, m => m.MovementId, md => md.MovementId, (m, md) => new { pID = md.ProductId, fecha = m.Date, md.Quantity, tipo = m.Type })
        .Where(p => p.tipo == "VENTA" && p.fecha.Year == year)
        .GroupBy(p => p.pID)
        .Select(g => new { g.Key, ventas = g.Sum(p => p.Quantity) })
        .OrderByDescending(p => p.ventas)
        .Take(5);

        var ids = topVentas.Select(t => t.Key);

        var topElementos = _context.Movements
        .Join(_context.Movementdetails, m => m.MovementId, md => md.MovementId, (m, md) => new { pID = md.ProductId, fecha = m.Date, md.Quantity, tipo = m.Type })
        .Where(p => p.tipo == "VENTA" && p.fecha.Year == year)
        .Select(p => new { p.pID, p.tipo, trimestre = Math.Ceiling(p.fecha.Month / 3f), p.Quantity })
        .Where(p => ids.Contains(p.pID))
        .GroupBy(p => new { p.pID, p.trimestre })
        .Select(g => new { prod = g.Key.pID, trimestre = g.Key.trimestre, ventas = g.Sum(p => p.Quantity) });

        var trimestres = new List<List<Object>>();
        trimestres.Add(new List<object>());
        trimestres.Add(new List<object>());
        trimestres.Add(new List<object>());
        trimestres.Add(new List<object>());
        foreach (var p in topElementos)
        {
            trimestres[(int)p.trimestre - 1].Add(new { pID = p.prod, ventas = p.ventas });
        }
        return trimestres;
    }

    [HttpGet]
    // [Authorize(Policy = "RequireAdmin")]
    [AllowAnonymous]
    [Route("productopormes/{idProd},{from},{to}")]
    public IEnumerable<Object> GetVentasProductoPorMes(int idProd, string from, string to)
    {
        var topVentas = _context.Movements
        .Join(_context.Movementdetails, m => m.MovementId, md => md.MovementId, (m, md) => new { pID = md.ProductId, fecha = m.Date.ToString("yyyyMM"), md.Quantity, tipo = m.Type })
        .Where(p => p.tipo == "VENTA" && p.pID == idProd).ToList();

        var ventas = topVentas
        .Where(p => p.fecha.CompareTo(from) >= 0 && p.fecha.CompareTo(to) <= 0)
        .GroupBy(p => p.fecha)
        .Select(g => new { fecha = g.Key, ventas = g.Sum(p => p.Quantity) });

        return ventas;
    }

    [HttpGet]
    // [Authorize(Policy = "RequireAdmin")]
    [AllowAnonymous]
    [Route("usuarioactual")]
    async public Task<Object> GetUsuarioActual(int idProd, string from, string to)
    {
        var currentUser = await _userManager.GetUserAsync(User);

        // var token = await _userManager.GeneratePasswordResetTokenAsync(currentUser);

        // var result = await _userManager.ResetPasswordAsync(currentUser, token, "MyN3wP@ssw0rd");
        return currentUser.Email;
    }

    private IEnumerable<T> Select<T>(DbDataReader reader, Func<DbDataReader, T> selector)
    {
        while (reader.Read())
        {
            yield return selector(reader);
        }
    }
}
