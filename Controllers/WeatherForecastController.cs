using aspnetcore_react_auth.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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


    private readonly ApplicationDbContext _context;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
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
            .Select(e => new {
                Company = e.Key,
                Empleados = e.Count()
            });

    }

    // GET: api/
    [HttpGet]
    [Route("top5")]
    public IEnumerable<Object> GetTop5()
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
            .Where(em => em.Anio == 1996)
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


}
