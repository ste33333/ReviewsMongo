using CarsMongo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarsMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IMongoCollection<Review> _reviewsCollection;


        public ReviewsController(IOptions<CarsDbContext> options) 
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _reviewsCollection = database.GetCollection<Review>(options.Value.ReviewsCollection);
        }

        // GET api/reviews/car/{carId} 
        [HttpGet("car/{carId}")]
        public async Task<ActionResult<List<Review>>> GetReviewsForCar(string carId)
        {
            if (string.IsNullOrEmpty(carId))
            {
                return BadRequest("Car ID cannot be null or empty.");
            }

            return await _reviewsCollection.Find(r => r.CarId == carId).ToListAsync();
        }

        // POST api/reviews 
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview([FromBody] Review newReview)
        {
            if (newReview == null)
            {
                return BadRequest("Review data is null.");
            }
            if (string.IsNullOrEmpty(newReview.CarId)) 
            {
                return BadRequest("CarId is required to post a review.");
            }

            newReview.DatePosted = System.DateTime.UtcNow;
            try
            {
                await _reviewsCollection.InsertOneAsync(newReview);
                return CreatedAtAction(nameof(GetReviewsForCar), new { carId = newReview.CarId }, newReview);
            }
            catch (MongoWriteException ex) 
            {
                Console.WriteLine($"MongoWriteException inserting review: {ex.Message}");
                Console.WriteLine($"WriteError: {ex.WriteError?.Message}");
                Console.WriteLine($"WriteConcernError: {ex.WriteConcernError?.Message}");
                return StatusCode(500, $"A database error occurred while posting the review: {ex.WriteError?.Message ?? ex.Message}");
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Generic error inserting review: {ex.ToString()}");
                return StatusCode(500, "An unexpected error occurred while posting the review.");
            }
        }

    }
}