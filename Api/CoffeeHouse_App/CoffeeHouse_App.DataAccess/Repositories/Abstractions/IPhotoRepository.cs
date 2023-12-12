using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface IPhotoRepository
    {
        Task <int> Add(Photo entity);
        Task<List<Photo>> GetAll();
        Task<Photo> GetPhotoById(int id);
        Task Remove(Photo photo);
        Task Update(Photo photo);
    }
}
