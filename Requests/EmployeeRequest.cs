namespace aspnetcore_react_auth.Requests;

public partial class EmployeeRequest
{
    public EmployeeRequest()
    { }


    public int EmployeeId { get; set; }
    public string LastName { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public DateTime? HireDate { get; set; }
    public string? Address { get; set; }
    public string? HomePhone { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}
