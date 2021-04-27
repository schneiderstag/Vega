using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing;
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
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PhotoController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.host = host;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false); // will not load the entire vehicle object

            if (vehicle == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads"); // wwwroot folder

            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            // Always generate a file name to avoid hackers modifying the file/path name on the fly, accessing directories such as C:/Windows
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);
            var thumbPath = Path.Combine(uploadsFolderPath, fileName, "thumbnail");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create thumbnail and save it to the folder.
            GenerateThumb(file, thumbPath);
            
            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }

        private void GenerateThumb(IFormFile file, string path, int width = 32, int height = 32)
        {
            try
            {
                Stream resourceImage = file.OpenReadStream();
                Image image = Image.FromStream(resourceImage);
                Image thumb = image.GetThumbnailImage(width, height, () => false, IntPtr.Zero);

                thumb.Save(path);
            }
            catch (Exception e)
            {
                var exception = new Exception("Could not generate thumbnail: " + e.ToString());
                throw exception;
            }
        }
    }
}
