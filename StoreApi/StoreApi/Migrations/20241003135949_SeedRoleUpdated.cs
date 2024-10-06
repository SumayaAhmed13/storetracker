using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StoreApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoleUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "3077dd51-743c-48e6-86e2-f0e79a31c97b", null, "Member", "MEMBER" },
                    { "df6a372b-59e4-458e-9594-eb7c4af3ef77", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3077dd51-743c-48e6-86e2-f0e79a31c97b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df6a372b-59e4-458e-9594-eb7c4af3ef77");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07198345-fddb-46e9-9a24-04fd2456d3cf", null, "Admin", "ADMIN" },
                    { "65ac5e9e-78a9-4509-8de3-4fa8f3259c66", null, "Member", "MEMBER" }
                });
        }
    }
}
