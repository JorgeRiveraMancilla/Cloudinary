using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        private readonly IPhotoService _photoService;
        private readonly DataContext _dataContext;
        
        public PhotosController(DataContext dataContext, IPhotoService photoService)
        {
            _dataContext = dataContext;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<PhotoDto[]>> GetPhotos()
        {
            var photos = await _dataContext.Photos.ToListAsync();

            return Ok(photos);
        }

        [HttpPost]
        public async Task<ActionResult> AddPhoto(IFormFile file)
        {
            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new AppPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            await _dataContext.Photos.AddAsync(photo);

            if (0 < await _dataContext.SaveChangesAsync())
                return Ok();
            
            return BadRequest("Error");
        }

        [HttpDelete("{photoId:int}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var photo = await _dataContext.Photos.FirstOrDefaultAsync(x => x.Id == photoId);

            if (photo == null) return NotFound();

            _dataContext.Photos.Remove(photo);

            if (0 < await _dataContext.SaveChangesAsync())
                return Ok();

            return BadRequest("Error");
        }
    }
}