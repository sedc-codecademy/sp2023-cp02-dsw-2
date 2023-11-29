using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.Services.Abstraction;

namespace CoffeeHouse_App.Services.Implementation
{
    public class AddressService : IAddressService
    {
        private readonly IUserAddressRepository _userAddressRepository;
        //private readonly IAddressRepository _addressRepository;

        public AddressService(IUserAddressRepository userAddressRepository)
        {
            _userAddressRepository = userAddressRepository;
           // _addressRepository = addressRepository;
        }

        public async Task CreateNewAddress(UserAddress address)
        {
            await _userAddressRepository.Add(address);
        }

        public async Task<List<UserAddress>?> GetAllUserAddress()
        {
            return await _userAddressRepository.GetAll();
        }

        //public async Task UpdateAddress(Address address)
        //{
        //    await _addressRepository.Update(address);
        //}
    }
}
