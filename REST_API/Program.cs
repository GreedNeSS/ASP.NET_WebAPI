using REST_API.Models;

List<Person> users = new List<Person>()
{
    new(){Id = Guid.NewGuid().ToString(), Name = "GreeNeSS", Age = 30},
    new(){Id = Guid.NewGuid().ToString(), Name = "Marcus", Age = 45},
    new(){Id = Guid.NewGuid().ToString(), Name = "Henry", Age = 24},
};

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/users", () => users);

app.MapGet("/api/users/{id}", (string id) =>
{
    Person? user = users.FirstOrDefault(u => u.Id == id);

    if (user == null)
    {
        return Results.NotFound(new { message = "Пользователь не найден!" });
    }

    return Results.Json(user);
});

app.MapDelete("/api/users/{id}", (string id) =>
{
    Person? user = users.FirstOrDefault(u => u.Id == id);

    if (user == null)
    {
        return Results.NotFound(new { message = "Пользователь не найден!" });
    }

    users.Remove(user);
    return Results.Json(user);
});

app.MapPost("/api/users", (Person user) =>
{
    user.Id = Guid.NewGuid().ToString();
    users.Add(user);
    return Results.Json(user);
});

app.MapPut("/api/users", (Person userData) =>
{
    Person? user = users.FirstOrDefault(u => u.Id == userData.Id);

    if (user == null)
    {
        return Results.NotFound(new { message = "Пользователь не найден!" });
    }

    user.Name = userData.Name;
    user.Age = userData.Age;
    return Results.Json(user);
});

app.Run();
