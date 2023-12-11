using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.Services.Abstractions;

namespace CoffeeHouse_App.Services.Implmentations
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task CreateNewAddress(Address address)
        {
            await _addressRepository.Add(address);
        }

        public async Task<List<Address>?> GetAllAddress()
        {
            return await _addressRepository.GetAll();
        }

        public async Task<Address?> GetAddressById(int id)
        {
            return await _addressRepository.GetByIdInt(id);
        }

        public async Task UpdateAddress(Address address)
        {
            await _addressRepository.Update(address);
        }
    }
}
