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
    public class City
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public DateTime LastUpdated { get; set; }

        public List<City> ReadCities(string regionName = "")
        {

                var regions = new List<Region>();
                var cities = new List<City>();

                regions = DBContext.mongoConnect<Region>(Constants.REGION).Find(x => x.Name == regionName || regionName=="").ToList();

                foreach (var region in regions)
                {
                    if (region.Cities.Count > 0)
                    {
                        cities.AddRange(region.Cities);
                    }
                }

            return cities;
        }
    }
}