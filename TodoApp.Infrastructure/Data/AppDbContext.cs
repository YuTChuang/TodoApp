using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Todo> Todos => Set<Todo>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
}
