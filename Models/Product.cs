using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Product
    {
        public Product()
        {
            Movementdetails = new HashSet<Movementdetail>();
            Orderdetails = new HashSet<Orderdetail>();
            Warehouseproducts = new HashSet<Warehouseproduct>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int? SupplierId { get; set; }
        public int? CategoryId { get; set; }
        public string? QuantityPerUnit { get; set; }
        public double? UnitPrice { get; set; }
        public string? PhotoPath { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Supplier? Supplier { get; set; }
        public virtual ICollection<Movementdetail> Movementdetails { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
        public virtual ICollection<Warehouseproduct> Warehouseproducts { get; set; }
    }
}
