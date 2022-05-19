using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcore_react_auth.Data;
using aspnetcore_react_auth.Models;
using aspnetcore_react_auth.Requests;
using Microsoft.AspNetCore.Identity;

namespace aspnetcore_react_auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployeesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Employees
        [HttpGet]
        public Object GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var empleados = _context.Employees.Select(p => new { p.EmployeeId, p.LastName, p.FirstName, p.HireDate, p.Address, p.HomePhone, p.Email, p.Password });
            return empleados;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutEmployee(EmployeeRequest employee)
        {
            var usuario = _context.Employees.Find(employee.EmployeeId);
            var aspUser = _context.Users.Where(e => e.UserName == usuario.Email).FirstOrDefault();

            usuario.LastName = employee.LastName;
            usuario.FirstName = employee.FirstName;
            usuario.HireDate = employee.HireDate;
            usuario.Address = employee.Address;
            usuario.HomePhone = employee.HomePhone;
            if (!usuario.Email.Equals(employee.Email))
            {
                Console.WriteLine("AAAA");
                await _userManager.SetUserNameAsync(aspUser, employee.Email);
                Console.WriteLine("BBBBBB");
            }
            if (!usuario.Password.Equals(employee.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(aspUser);
                var result = await _userManager.ResetPasswordAsync(aspUser, token, employee.Password);
            }

            usuario.Email = employee.Email;
            usuario.Password = employee.Password;

            _context.Entry(aspUser).State = EntityState.Modified;
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<string> CreateUser(string user, string clave)
        {
            var userA = new ApplicationUser
            {
                UserName = user,
                EmailConfirmed = true
            };
            await _userManager.CreateAsync(userA, clave);

            return userA.Id;
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeRequest employeeRequest)
        {
            var employee = new Employee()
            {
                EmployeeId = employeeRequest.EmployeeId,
                LastName = employeeRequest.LastName,
                FirstName = employeeRequest.FirstName,
                HireDate = employeeRequest.HireDate,
                Address = employeeRequest.Address,
                HomePhone = employeeRequest.HomePhone,
                Email = employeeRequest.Email,
                Password = employeeRequest.Password,
                CompanyId = 1
            };
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            CreateUser(employee.Email, employee.Password);

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            // await _context.SaveChangesAsync();
            var usuario = _context.Users.Where(u => u.UserName == employee.Email).FirstOrDefault();
            _context.Users.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employees?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
