using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StoreApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7f10d544-a089-4ec5-8150-0b6713e55b51");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84a8a4cd-939f-4171-b472-fe538111d389");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07198345-fddb-46e9-9a24-04fd2456d3cf", null, "Admin", "ADMIN" },
                    { "65ac5e9e-78a9-4509-8de3-4fa8f3259c66", null, "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07198345-fddb-46e9-9a24-04fd2456d3cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65ac5e9e-78a9-4509-8de3-4fa8f3259c66");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7f10d544-a089-4ec5-8150-0b6713e55b51", null, "Member", "MEMBER" },
                    { "84a8a4cd-939f-4171-b472-fe538111d389", null, "Admin", "ADMIN" }
                });
        }
    }
}
