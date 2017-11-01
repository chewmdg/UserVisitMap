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
    public class UserVisit
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string _id { get; set; }
        public string user_id {get; set;}
        public string City {get; set;}
        public DateTime DateAdded {get; set;}
        public DateTime DateTimeAdded {get; set;}
        public DateTime LastUpdated {get; set;}

        public List<UserVisit> ReadUserVisit(string user_id = "")
        {
            var userVisits = new List<UserVisit>();

            userVisits = DBContext.mongoConnect<UserVisit>(Constants.USERVISIT).Find(x => x.user_id == _id || _id=="").ToList();
            return userVisits;
        }
    }
}