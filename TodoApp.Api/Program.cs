using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Services;
using TodoApp.Domain.Interfaces;
using TodoApp.Infrastructure.Data;
using TodoApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// 1 設定 SQLite
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=todo.db")); // SQLite

// 2 註冊 Repository 與 Service
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<TodoService>();

// 3 設定 CORS
var MyAllowReactOrigins = "_myAllowReactApp";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowReactOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React 前端
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 4 設定 Controller、Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5 使用 CORS
app.UseCors(MyAllowReactOrigins);

// 6 使用 Swagger
app.UseSwagger();
app.UseSwaggerUI();

// 7 Map Controllers
app.MapControllers();

// 8 執行應用程式
app.Run();