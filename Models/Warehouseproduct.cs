using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Warehouseproduct
    {
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public short UnitsInStock { get; set; }
        public short UnitsOnOrder { get; set; }
        public short ReorderLevel { get; set; }
        public sbyte Discontinued { get; set; }

        public virtual Product Product { get; set; } = null!;
        public virtual Warehouse Warehouse { get; set; } = null!;
    }
}
