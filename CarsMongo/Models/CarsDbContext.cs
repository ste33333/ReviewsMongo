namespace CarsMongo.Models
{
    public class CarsDbContext
    {
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
        public string? CollectionName { get; set; }
        public string? BsonDocumentsCollection { get; set; }
        public string? ReviewsCollection { get; set; }
    }
}
