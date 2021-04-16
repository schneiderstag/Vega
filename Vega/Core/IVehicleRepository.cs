using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<T> GetVehicle(int id, bool includeRelated = true);
        Task<IEnumerable<T>> GetVehicles(VehicleQuery filter);
        void Add(T vehicle);
        void Remove(T vehicle);
    }
}