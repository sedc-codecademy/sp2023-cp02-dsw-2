using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Implementations
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly CoffeeHouseDbContext _coffeeHouseDbContext;

        public PhotoRepository(CoffeeHouseDbContext coffeeHouseDbContext) 
        {
            _coffeeHouseDbContext = coffeeHouseDbContext;
        }


        public async Task<int> Add(Photo entity)
        {
            try
            {
                if( !await _coffeeHouseDbContext.Photos.AnyAsync(x => x.Bytes == entity.Bytes)){
                    _coffeeHouseDbContext.Photos.Add(entity);
                    await _coffeeHouseDbContext.SaveChangesAsync();
                    return entity.Id;
                }
                Photo pictureAlreadyExisting = await _coffeeHouseDbContext.Photos.FirstOrDefaultAsync(x => x.Bytes == entity.Bytes);
                return pictureAlreadyExisting.Id;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<Photo>> GetAll()
        {
            try
            {
                List<Photo> allPhotos = await _coffeeHouseDbContext
                    .Photos
                    .ToListAsync();
                return allPhotos;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<Photo> GetPhotoById(int id)
        {
            try
            {
                return await _coffeeHouseDbContext
                .Photos
                .FirstOrDefaultAsync(e => e.Id == id);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public async Task Remove(Photo photo)
        {
            try
            {
                _coffeeHouseDbContext.Photos.Remove(photo);
                await _coffeeHouseDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task Update(Photo photo)
        {
            try
            {
                _coffeeHouseDbContext.Photos.Update(photo);
                await _coffeeHouseDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }




    }
}
