using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using aspnetcore_react_auth.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;

namespace aspnetcore_react_auth.Data
{
    public partial class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        //dotnet ef migrations add InitialCreate --context ApplicationDbContext
        //dotnet ef database update --context ApplicationDbContext
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        public virtual DbSet<Movement> Movements { get; set; } = null!;
        public virtual DbSet<Movementdetail> Movementdetails { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<Warehouse> Warehouses { get; set; } = null!;
        public virtual DbSet<Warehouseproduct> Warehouseproducts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=0000;database=northwind", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.26-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.HasIndex(e => e.CategoryName, "Categories_CategoryName");

                entity.HasIndex(e => e.CompanyId, "fk_categories_companies1_idx");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CategoryName).HasMaxLength(15);

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_categories_companies1");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("companies");

                entity.HasIndex(e => e.AccountEmail, "AccountEmail_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.CompanyName, "CompanyName_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.AccountEmail).HasMaxLength(100);

                entity.Property(e => e.CompanyName).HasMaxLength(70);

                entity.Property(e => e.Password).HasMaxLength(40);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employees");

                entity.HasIndex(e => e.LastName, "Employees_LastName");

                entity.HasIndex(e => e.ReportsTo, "FK_Employees_Employees");

                entity.HasIndex(e => e.Email, "UQ_Email")
                    .IsUnique();

                entity.HasIndex(e => e.CompanyId, "fk_employees_companies1_idx");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.Address).HasMaxLength(60);

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(10);

                entity.Property(e => e.HireDate).HasColumnType("datetime");

                entity.Property(e => e.HomePhone).HasMaxLength(24);

                entity.Property(e => e.LastName).HasMaxLength(20);

                entity.Property(e => e.Password).HasMaxLength(40);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employees_companies1");

                entity.HasOne(d => d.ReportsToNavigation)
                    .WithMany(p => p.InverseReportsToNavigation)
                    .HasForeignKey(d => d.ReportsTo)
                    .HasConstraintName("FK_Employees_Employees");
            });

            modelBuilder.Entity<Movement>(entity =>
            {
                entity.ToTable("movements");

                entity.HasIndex(e => e.SupplierId, "fk_Movimientos_suppliers1_idx");

                entity.HasIndex(e => e.OriginWarehouseId, "fk_Movimientos_warehouses1_idx");

                entity.HasIndex(e => e.TargetWarehouseId, "fk_Movimientos_warehouses2_idx");

                entity.HasIndex(e => e.CompanyId, "fk_movements_companies1_idx");

                entity.HasIndex(e => e.EmployeeId, "fk_movements_employees1_idx");

                entity.Property(e => e.MovementId).HasColumnName("MovementID");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .HasComment("Es obligatorio en caso de los movimientos por ajuste, es posible que para algún otro movimiento se use este campo para capturar algún comentario u observación importante");

                entity.Property(e => e.OriginWarehouseId)
                    .HasColumnName("OriginWarehouseID")
                    .HasComment("Almacén al que refiere el movimiento ");

                entity.Property(e => e.SupplierId)
                    .HasColumnName("SupplierID")
                    .HasComment("Solo aplica para los movimientos de entrada por compra");

                entity.Property(e => e.TargetWarehouseId)
                    .HasColumnName("TargetWarehouseID")
                    .HasComment("Representa el almacen de de destino en el caso de ser un movimiento por traspaso");

                entity.Property(e => e.Type).HasColumnType("enum('COMPRA','TRASPASO','AJUSTE','VENTA')");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Movements)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_movements_companies1");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Movements)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_movements_employees1");

                entity.HasOne(d => d.OriginWarehouse)
                    .WithMany(p => p.MovementOriginWarehouses)
                    .HasForeignKey(d => d.OriginWarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Movimientos_warehouses1");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Movements)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("fk_Movimientos_suppliers1");

                entity.HasOne(d => d.TargetWarehouse)
                    .WithMany(p => p.MovementTargetWarehouses)
                    .HasForeignKey(d => d.TargetWarehouseId)
                    .HasConstraintName("fk_Movimientos_warehouses2");
            });

            modelBuilder.Entity<Movementdetail>(entity =>
            {
                entity.HasKey(e => new { e.MovementId, e.ProductId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("movementdetails");

                entity.HasIndex(e => e.MovementId, "fk_DetallesMovimientos_Movimientos1_idx");

                entity.HasIndex(e => e.ProductId, "fk_DetallesMovimientos_products1_idx");

                entity.Property(e => e.MovementId).HasColumnName("MovementID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Quantity).HasComment("Todos los movimientos manejaran cantidades en positivo, a excepción de los movimientos de ajuste que pueden manejar negativos, indicando así, cuando la cantidad de artículos se quiera dar de baja.");

                entity.HasOne(d => d.Movement)
                    .WithMany(p => p.Movementdetails)
                    .HasForeignKey(d => d.MovementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_DetallesMovimientos_Movimientos1");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Movementdetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_DetallesMovimientos_products1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.HasIndex(e => e.CategoryId, "Products_CategoriesProducts");

                entity.HasIndex(e => e.ProductName, "Products_ProductName");

                entity.HasIndex(e => e.SupplierId, "Products_SupplierID");

                entity.HasIndex(e => e.CompanyId, "fk_products_companies1_idx");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.PhotoPath).HasMaxLength(50);

                entity.Property(e => e.ProductName).HasMaxLength(40);

                entity.Property(e => e.QuantityPerUnit).HasMaxLength(20);

                entity.Property(e => e.SupplierId).HasColumnName("SupplierID");

                entity.Property(e => e.UnitPrice).HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Products_Categories");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_products_companies1");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK_Products_Suppliers");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("suppliers");

                entity.HasIndex(e => e.CompanyName, "Suppliers_CompanyName");

                entity.HasIndex(e => e.PostalCode, "Suppliers_PostalCode");

                entity.HasIndex(e => e.CompanyId, "fk_suppliers_companies1_idx");

                entity.Property(e => e.SupplierId).HasColumnName("SupplierID");

                entity.Property(e => e.Address).HasMaxLength(60);

                entity.Property(e => e.City).HasMaxLength(15);

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.CompanyName).HasMaxLength(40);

                entity.Property(e => e.ContactName).HasMaxLength(30);

                entity.Property(e => e.Country).HasMaxLength(15);

                entity.Property(e => e.Phone).HasMaxLength(24);

                entity.Property(e => e.PostalCode).HasMaxLength(10);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Suppliers)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_suppliers_companies1");
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.ToTable("warehouses");

                entity.HasIndex(e => e.CompanyId, "fk_warehouses_companies1_idx");

                entity.Property(e => e.WarehouseId).HasColumnName("WarehouseID");

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.Description).HasMaxLength(45);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Warehouses)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_warehouses_companies1");
            });

            modelBuilder.Entity<Warehouseproduct>(entity =>
            {
                entity.HasKey(e => new { e.WarehouseId, e.ProductId })
                    .HasName("PRIMARY")
                    .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                entity.ToTable("warehouseproducts");

                entity.HasIndex(e => e.ProductId, "fk_WarehouseProducts_products1_idx");

                entity.Property(e => e.WarehouseId).HasColumnName("WarehouseID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Warehouseproducts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_WarehouseProducts_products1");

                entity.HasOne(d => d.Warehouse)
                    .WithMany(p => p.Warehouseproducts)
                    .HasForeignKey(d => d.WarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_WarehouseProducts_warehouses");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
