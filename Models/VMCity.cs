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
    public class VMCity
    {
        public string Name { get; set; }
        public string Region {get; set; }
        public string Status { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public DateTime LastUpdated { get; set; }

        public List<VMCity> ReadCitiesRegion(string regionName = "")
        {

                var regions = new List<Region>();
                var cities = new List<City>();
                var cityRegioins = new List<VMCity>();

                regions = DBContext.mongoConnect<Region>(Constants.REGION).Find(x => x.Name == regionName || regionName=="").ToList();

                foreach (var region in regions)
                {
                    if (region.Cities.Count > 0)
                    {
                        cities.AddRange(region.Cities.ToList());

                        foreach (City city in cities)
                        {
                            VMCity tempCity = new VMCity{
                                Name = city.Name,
                                Region = region.Name,
                                Status = city.Status,
                                Latitude = city.Latitude,
                                Longitude = city.Longitude,
                                DateAdded = city.DateAdded,
                                DateTimeAdded = city.DateTimeAdded,
                                LastUpdated = city.LastUpdated
                            };
                            
                            cityRegioins.Add(tempCity);
                        }

                    }
                }

            return cityRegioins;
        }
    }
}