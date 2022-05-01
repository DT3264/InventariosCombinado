using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Movement
    {
        public Movement()
        {
            Movementdetails = new HashSet<Movementdetail>();
        }

        public int MovementId { get; set; }
        public DateTime Date { get; set; }
        /// <summary>
        /// Solo aplica para los movimientos de entrada por compra
        /// </summary>
        public int? SupplierId { get; set; }
        /// <summary>
        /// Almacén al que refiere el movimiento 
        /// </summary>
        public int OriginWarehouseId { get; set; }
        /// <summary>
        /// Representa el almacen de de destino en el caso de ser un movimiento por traspaso
        /// </summary>
        public int? TargetWarehouseId { get; set; }
        public string Type { get; set; } = null!;
        /// <summary>
        /// Es obligatorio en caso de los movimientos por ajuste, es posible que para algún otro movimiento se use este campo para capturar algún comentario u observación importante
        /// </summary>
        public string? Notes { get; set; }

        public virtual Warehouse OriginWarehouse { get; set; } = null!;
        public virtual Supplier? Supplier { get; set; }
        public virtual Warehouse? TargetWarehouse { get; set; }
        public virtual ICollection<Movementdetail> Movementdetails { get; set; }
    }
}
