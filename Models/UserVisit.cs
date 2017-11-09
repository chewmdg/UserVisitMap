using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
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
        public string Region {get; set;}
        public double Latitude {get; set;}
        public double Longitude {get; set;}
        public DateTime DateAdded {get; set;}
        public DateTime DateTimeAdded {get; set;}
        public DateTime LastUpdated {get; set;}

        public List<UserVisit> ReadUserVisit(ClaimsPrincipal claimsPrincipal)
        {
            var userVisits = new List<UserVisit>();

            var userId = PrincipalReader.ReadPrincipal(claimsPrincipal, "_id");

            userVisits = DBContext.mongoConnect<UserVisit>(Constants.USERVISIT).Find(x => x.user_id == userId.Value).ToList();
            return userVisits;
        }

        public static void CreateUserVisit(UserVisit userVisit)
        {
            DBContext.mongoConnect<UserVisit>(Constants.USERVISIT).InsertOne(userVisit);
        }

        public static void DeleteUserVisit(string id)
        {
            DBContext.mongoConnect<UserVisit>(Constants.USERVISIT).DeleteOne(x => x._id == id);
        }
    }
}