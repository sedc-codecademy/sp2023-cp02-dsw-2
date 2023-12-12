using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CoffeeHouse_App.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PhotoId",
                table: "AspNetUsers",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedAt", "IsDeleted", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3680), false, null, "Kafe vo zrno" },
                    { 2, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3685), false, null, "Meleno kafe" },
                    { 3, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3689), false, null, "Kafe kapsuli" },
                    { 4, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3693), false, null, "Kafemat" }
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "Id", "CreatedAt", "Description", "DiscountPercent", "IsDeleted", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3824), "Black Friday Discount", 15, false, null, "Black Friday" },
                    { 2, new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3828), "Easter Holiday Discount", 10, false, null, "Easter Discount" }
                });
        }
    }
}
