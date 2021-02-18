using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make 3')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 1 - Model A', (SELECT Id FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 1 - Model B', (SELECT Id FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 1 - Model C', (SELECT Id FROM Makes WHERE Name = 'Make 1'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 2 - Model A', (SELECT Id FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 2 - Model B', (SELECT Id FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 2 - Model C', (SELECT Id FROM Makes WHERE Name = 'Make 2'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 3 - Model A', (SELECT Id FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 3 - Model B', (SELECT Id FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make 3 - Model C', (SELECT Id FROM Makes WHERE Name = 'Make 3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('Make 1', 'Make 2', 'Make 3')");
            //migrationBuilder.Sql("DELETE FROM Models"); // When we delete from Makes all the associated models will also be deleted (Cascade).
        }
    }
}
