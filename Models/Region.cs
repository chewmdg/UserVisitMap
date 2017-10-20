using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using UserVisitMap.Utilities;


namespace UserVisitMap.Models
{
    public class Region
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string _id { get; set; }
        public string Name {get; set;}
        public string Abbreviation {get; set;}
        public DateTime DateAdded {get; set;}
        public DateTime DateTimeAdded {get; set;}
        public DateTime LastUpdated {get; set;}
        public List<City> Cities { get; set; }
        public List<Region> ReadRegions(string name = "")
        {
            var regions = new List<Region>();

            regions = DBContext.mongoConnect<Region>(Constants.REGION).Find(x => x.Name == name || name=="").ToList();
            return regions;
        }
    }
}