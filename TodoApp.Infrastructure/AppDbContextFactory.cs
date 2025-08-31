using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure
{
    /// <summary>
    /// 用於設計時建立 DbContext 實例（例如執行 dotnet ef 指令時）
    /// </summary>
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // 提供 SQLite 連線字串
            optionsBuilder.UseSqlite("Data Source=todo.db");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
