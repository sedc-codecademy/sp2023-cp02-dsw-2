namespace CoffeeHouse_App.DTOs
{
    public class AddressModel
    {
        //public string Id { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
        public int? CountryId { get; set; }
        //public string CountryName { get; set; } = string.Empty;

    }
}
