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
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly CoffeeHouseDbContext _coffeeHouseDbContext;

        public BaseRepository(CoffeeHouseDbContext coffeeHouseDbContext)
        {
            _coffeeHouseDbContext = coffeeHouseDbContext;
        }


        public async Task Add(T entity)
        {
            try
            {
                _coffeeHouseDbContext.Set<T>().Add(entity);
                await _coffeeHouseDbContext.SaveChangesAsync();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<T>> GetAll()
        {
            try
            {
                List<T> allEntities = await _coffeeHouseDbContext
                    .Set<T>()
                    .Where(e=>e.IsDeleted == false)
                    .ToListAsync();
                return allEntities;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<T> GetByIdInt(int id)
        {
            try
            {
                return await _coffeeHouseDbContext
                .Set<T>()
                .FirstOrDefaultAsync(e => e.IsDeleted == false && e.Id == id);
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        public async Task Remove(T entity)
        {
            try
            {
                entity.IsDeleted= true;
                _coffeeHouseDbContext.Set<T>().Update(entity);
                await _coffeeHouseDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task SaveChanges()
        {
            try
            {
                await _coffeeHouseDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Update(T entity)
        {
            try
            {
                _coffeeHouseDbContext.Set<T>().Update(entity);
                await _coffeeHouseDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
