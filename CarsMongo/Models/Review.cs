using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CarsMongo.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)] 
        public string CarId { get; set; }

        public string ReviewerName { get; set; }
        public int Rating { get; set; } 
        public string Comment { get; set; }
        public DateTime DatePosted { get; set; } = DateTime.UtcNow;
    }
}

