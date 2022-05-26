using REST_API.Models;

List<Person> users = new List<Person>()
{
    new(){Id = new Guid().ToString(), Name = "GreeNeSS", Age = 30},
    new(){Id = new Guid().ToString(), Name = "Marcus", Age = 45},
    new(){Id = new Guid().ToString(), Name = "Henry", Age = 24},
};

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();
app.UseDefaultFiles();

app.MapGet("/api/users", () => users);
app.MapGet("/api/user/{id}", (string id) =>
{
    Person? user = users.FirstOrDefault(u => u.Id == id);

    if (user == null)
    {

    }
});

app.Run();
