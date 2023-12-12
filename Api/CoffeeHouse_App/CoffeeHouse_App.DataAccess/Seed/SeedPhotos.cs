using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace CoffeeHouse_App.DataAccess.Seed
{
    class SeedPhotos
    {
        private static string[] imageNames = { "picture1.png", "picture2.png", "picture3.png", "picture4.png", "picture5.png", "picture6.png", "picture7.png", "picture8.png"};
        private static string folder = "/Images/";
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            dbContext.Database.OpenConnection();
            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Photos ON");
            var images = GetBase64Images();
            UpdatePhotos(images, dbContext);

            dbContext.SaveChanges();

            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Photos OFF");
            dbContext.Database.CloseConnection();
        }

        private static void UpdatePhotos(List<string> images, CoffeeHouseDbContext dbContext)
        {
            int lastFileId = 1;
            var lastFile = dbContext.Photos.OrderBy(x => x.Id).AsEnumerable().LastOrDefault();

            if (lastFile != null)
            {
                lastFileId = lastFile.Id + 1;
            }

            foreach (var image in images)
            {
                byte[] imageBytes = Convert.FromBase64String(image);
               

                if (!PhotoExists(dbContext, imageBytes))
                {
                    var id = lastFileId++;
                   dbContext.Photos.Add(new Photo
                    {
                        Id = id,
                        Bytes = imageBytes,
                        Description = $"picture{id}.png",
                        FileExtension = ".png",
                        Size = GetFileSize(imageBytes)
                    });
                }
            }
        }

        private static bool PhotoExists(CoffeeHouseDbContext dbContext, byte[] imageBytes)
        {
            return dbContext.Photos.Any(photo => photo.Bytes.SequenceEqual(imageBytes));
        }
        private static long GetFileSize(byte[] imageBytes)
        {
            return imageBytes.Length;
        }

        private static List<string> GetBase64Images()
        {
            var images = new List<string>();
            string location = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            foreach(var name in imageNames)
            {
                string path = Path.Combine(location + folder, name);
                byte[] img = File.ReadAllBytes(path);
                string base64img = Convert.ToBase64String(img);
                images.Add(base64img);
            }
            return images;
        }
    }
}
