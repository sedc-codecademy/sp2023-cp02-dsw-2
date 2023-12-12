using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.DataAccess.Repositories.Implementations;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.Services.Abstractions;

namespace CoffeeHouse_App.Services.Implementations
{
    public class UserAddressService : IUserAddressService
    {
        private readonly IUserAddressRepository _userAddressRepository;
        private readonly IPhotoRepository _photoRepository;

        public UserAddressService(IUserAddressRepository userAddressRepository, IPhotoRepository photoRepository)
        {
            _userAddressRepository = userAddressRepository;
            _photoRepository = photoRepository;
        }

        public async Task CreateNewUserAddress(UserAddress address)
        {
            await _userAddressRepository.Add(address);
        }

        public async Task<List<UserAddress>?> GetAllUserAddress()
        {
            return await _userAddressRepository.GetAll();
        }

        public async Task<Photo> GetPhotoById(int pictureId)
        {
            return await _photoRepository.GetPhotoById(pictureId);
        }
    }
}
