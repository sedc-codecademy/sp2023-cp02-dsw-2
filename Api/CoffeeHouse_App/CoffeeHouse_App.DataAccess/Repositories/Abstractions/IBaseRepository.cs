using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface IBaseRepository<T>
    {
        Task Add(T entity);
        Task Update(T entity);
        Task Remove(T entity);
        Task<T> GetByIdInt(int id);
        Task<List<T>> GetAll();
        Task SaveChanges();
    }
}
