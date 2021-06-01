using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IPhotoRepository
    {
        Task<List<Photo>> GetPhotos();
        Task<IEnumerable<Photo>> GetVehiclePhotos(int vehicleId);
    }
}
