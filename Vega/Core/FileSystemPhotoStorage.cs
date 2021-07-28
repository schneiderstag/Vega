using Microsoft.AspNetCore.Http;
using System;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace Vega.Core
{
    public class FileSystemPhotoStorage : IPhotoStorage
    {
        public async Task<string> StorePhoto(string uploadsFolderPath, string uploadsThumbnailFolderPath, IFormFile file)
        {
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            if (!Directory.Exists(uploadsThumbnailFolderPath))
                Directory.CreateDirectory(uploadsThumbnailFolderPath);

            // Always generate a file name to avoid hackers modifying the file/path name on the fly, accessing directories such as C:/Windows
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);
            var thumbnailPath = Path.Combine(uploadsThumbnailFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create thumbnail and save it to the folder.
            CreateThumbnail(file, thumbnailPath);

            return fileName;
        }

        private void CreateThumbnail(IFormFile file, string path, int width = 32, int height = 32)
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