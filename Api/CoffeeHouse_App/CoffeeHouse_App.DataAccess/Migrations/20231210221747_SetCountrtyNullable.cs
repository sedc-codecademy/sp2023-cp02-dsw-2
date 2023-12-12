using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeHouse_App.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SetCountrtyNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Countries_CountryId",
                table: "Addresses");

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Addresses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3685));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3689));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3693));

            migrationBuilder.UpdateData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3824));

            migrationBuilder.UpdateData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2023, 12, 10, 23, 17, 47, 204, DateTimeKind.Local).AddTicks(3828));

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Countries_CountryId",
                table: "Addresses",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Countries_CountryId",
                table: "Addresses");

            migrationBuilder.AlterColumn<int>(
                name: "CountryId",
                table: "Addresses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1876));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1882));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1886));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(1890));

            migrationBuilder.UpdateData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(2123));

            migrationBuilder.UpdateData(
                table: "Discounts",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2023, 11, 28, 11, 43, 40, 923, DateTimeKind.Local).AddTicks(2128));

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Countries_CountryId",
                table: "Addresses",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
