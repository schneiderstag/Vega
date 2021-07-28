using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotoController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IPhotoRepository photoRepository;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;
        private readonly PhotoSettings photoSettings;

        public PhotoController(IWebHostEnvironment host,
                               IVehicleRepository repository,
                               IPhotoRepository photoRepository,
                               IMapper mapper,
                               IPhotoService photoService,
                               IOptionsSnapshot<PhotoSettings> options)
        {
            this.host = host;
            this.repository = repository;
            this.photoRepository = photoRepository;
            this.mapper = mapper;
            this.photoService = photoService;
            this.photoSettings = options.Value; // Values coming from Statup.cs -> appsettings.json
        }

        [HttpGet("/api/photos")]
        public async Task<IEnumerable<PhotoResource>> GetPhotos()
        {
            var photos = await photoRepository.GetPhotos();
            return mapper.Map<List<Photo>, List<PhotoResource>>(photos);
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetVehiclePhotos(int vehicleId)
        {
            var photos = await photoRepository.GetVehiclePhotos(vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false); // will not load the entire vehicle object
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file.");
            if (file.Length == 0) return BadRequest("Empty file.");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded."); //10gb file max size
            if (!photoSettings.isSupported(file.FileName)) return BadRequest("Invalid file type.");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads"); // wwwroot folder
            var uploadsThumbnailFolderPath = Path.Combine(host.WebRootPath, "uploads\\thumbnails"); // wwwroot folder
            var photo = await photoService.UploadPhoto(vehicle, file, uploadsFolderPath, uploadsThumbnailFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}
