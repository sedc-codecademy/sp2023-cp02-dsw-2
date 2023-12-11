using CoffeeHouse_App.Domain.Entities;

namespace CoffeeHouse_App.Services.Abstractions
{
    public interface IAddressService
    {
        Task CreateNewAddress(Address address);
        Task<List<Address>?> GetAllAddress();

        Task<Address?> GetAddressById(int id);

        Task UpdateAddress(Address address);
    }
}
