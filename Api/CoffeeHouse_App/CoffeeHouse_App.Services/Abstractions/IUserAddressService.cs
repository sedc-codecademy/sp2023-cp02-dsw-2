using CoffeeHouse_App.Domain.Entities;

namespace CoffeeHouse_App.Services.Abstractions
{
    public interface IUserAddressService
    {
        Task CreateNewUserAddress(UserAddress address);
        Task<List<UserAddress>?> GetAllUserAddress();

        Task<Photo> GetPhotoById(int pictureId);
    }
}
