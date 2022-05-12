using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Employee
    {
        public Employee()
        {
            InverseReportsToNavigation = new HashSet<Employee>();
            Movements = new HashSet<Movement>();
        }

        public int EmployeeId { get; set; }
        public string LastName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public DateTime? HireDate { get; set; }
        public string? Address { get; set; }
        public string? HomePhone { get; set; }
        public int? ReportsTo { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int CompanyId { get; set; }

        public virtual Company Company { get; set; } = null!;
        public virtual Employee? ReportsToNavigation { get; set; }
        public virtual ICollection<Employee> InverseReportsToNavigation { get; set; }
        public virtual ICollection<Movement> Movements { get; set; }
    }
}
