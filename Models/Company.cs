using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Company
    {
        public Company()
        {
            Categories = new HashSet<Category>();
            Employees = new HashSet<Employee>();
            Movements = new HashSet<Movement>();
            Products = new HashSet<Product>();
            Suppliers = new HashSet<Supplier>();
            Warehouses = new HashSet<Warehouse>();
        }

        public int CompanyId { get; set; }
        public string CompanyName { get; set; } = null!;
        public string AccountEmail { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateOnly BeginPlan { get; set; }
        public DateOnly EndPlan { get; set; }
        public sbyte Active { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Movement> Movements { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Supplier> Suppliers { get; set; }
        public virtual ICollection<Warehouse> Warehouses { get; set; }
    }
}
