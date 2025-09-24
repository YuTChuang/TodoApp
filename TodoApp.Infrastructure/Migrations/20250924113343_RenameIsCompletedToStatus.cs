using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Infrastructure.Migrations
{
    public partial class RenameIsCompletedToStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 改欄位名稱
            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Todos",
                newName: "Status");

            // 將舊資料 1 (true) 改成 3 (Done)
            migrationBuilder.Sql(@"
                UPDATE Todos
                SET Status = 3
                WHERE Status = 1;
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // 還原資料：Done(3) 改回 1，其餘保持 0
            migrationBuilder.Sql(@"
                UPDATE Todos
                SET Status = 1
                WHERE Status = 3;
            ");

            // 欄位名稱改回 IsCompleted
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Todos",
                newName: "IsCompleted");
        }
    }
}
