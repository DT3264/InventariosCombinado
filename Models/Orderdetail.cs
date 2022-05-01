using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Orderdetail
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public double UnitPrice { get; set; }
        public short Quantity { get; set; }
        public double Discount { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
