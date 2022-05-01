using System;
using System.Collections.Generic;

namespace aspnetcore_react_auth.Models
{
    public partial class Comentario
    {
        public int Id { get; set; }
        public string Comentario1 { get; set; } = null!;
        public DateOnly Fecha { get; set; }
        public sbyte? Bloqueado { get; set; }
    }
}
