using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CoffeeHouse_App.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Seed_Data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "IsDeleted", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1876), false, null, "Kafe vo zrno" },
                    { 2, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1882), false, null, "Meleno kafe" },
                    { 3, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1886), false, null, "Kafe kapsuli" },
                    { 4, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1890), false, null, "Kafemat" }
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "Id", "CreatedAt", "Description", "DiscountPercent", "IsDeleted", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(2123), "Black Friday Discount", 15, false, null, "Black Friday" },
                    { 2, new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(2128), "Easter Holiday Discount", 10, false, null, "Easter Discount" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
