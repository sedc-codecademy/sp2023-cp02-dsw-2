using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs;

namespace CoffeeHouse_App.Mappers.UserMappers
{
    public static class UserMapper
    {
        public static User ToUser(CreateUserModel user)
        {
            return new User
            {
                Email = user.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }

        public static UserModel ToUserModel(this User user, Photo? photo)
        {
            return new UserModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Birthdate = user.Birthdate,
                Address = new AddressModel
                {
                   // City = user.UserAddresses.First().Address.City
                },
                ProfileImage = photo?.Bytes == null ? string.Empty : "data:image/jpeg;base64," + Convert.ToBase64String(photo.Bytes)
            };
        }

        public static User ToUpdatedUser(User user, UserProfileUpdateModel model)
        {
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Birthdate = model.Birthdate;
            user.PhoneNumber = model.PhoneNumber;
            return user;
        }


        public static UserAddress ToAddress(AddressModel addressModel, User user)
        {
            var address = new Address
            {
                Street = addressModel.Street,
                City = addressModel.City,
                Zip = addressModel.Zip,
                CountryId = addressModel.CountryId,
            };
            var newUserAddress = new UserAddress
            {
                Address = address,
                User = user
            };
            return newUserAddress;
        }
    }
}