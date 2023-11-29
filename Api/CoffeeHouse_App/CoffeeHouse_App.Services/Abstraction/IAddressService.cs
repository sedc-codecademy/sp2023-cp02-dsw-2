using CoffeeHouse_App.Domain.Entities;

namespace CoffeeHouse_App.Services.Abstraction
{
    public interface IAddressService
    {
        Task CreateNewAddress(UserAddress address);
        Task<List<UserAddress>?> GetAllUserAddress();

        //Task UpdateAddress(Address address);
    }
}
