using CarsMongo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarsMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private IMongoCollection<Car> _carsCollection;

        public CarsController(IOptions<CarsDbContext> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _carsCollection = database.GetCollection<Car>(options.Value.CollectionName);
        }

        // GET: api/Cars
        // GET: api/Cars?model=nomeModello
        [HttpGet]
        public async Task<List<Car>> Get([FromQuery] string? model) 
        {
            if (!string.IsNullOrEmpty(model))
            {
                var filter = Builders<Car>.Filter.Regex("Model", new MongoDB.Bson.BsonRegularExpression(model, "i"));
                return await _carsCollection.Find(filter).ToListAsync();
            }
            return await _carsCollection.Find(c => true).ToListAsync();
        }

        // GET api/<CarsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("ID cannot be null or empty.");
            }
            var car = await _carsCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
            if (car == null)
            {
                return NotFound($"Car with ID = {id} not found."); 
            }
            return Ok(car); 
        }

        // POST api/<CarsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Car newCar) 
        {
            if (newCar == null)
            {
                return BadRequest("Car data is null.");
            }
            await _carsCollection.InsertOneAsync(newCar);
            return CreatedAtAction(nameof(GetById), new { id = newCar.Id }, newCar);
        }

        // PUT api/<CarsController>/5
        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody] Car car)
        {
            await _carsCollection.ReplaceOneAsync(c => c.Id == id, car);
        }

        // DELETE api/<CarsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) 
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid ID supplied.");
            }

            var deleteResult = await _carsCollection.DeleteOneAsync(c => c.Id == id);

            if (deleteResult.DeletedCount == 0)
            {
                return NotFound($"Car with ID = {id} not found.");
            }

            return Ok($"Car with ID = {id} deleted successfully."); 
        }
    }
}
