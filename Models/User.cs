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
    public class User
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string _id { get; set; }
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public DateTime DateAdded {get; set;}
        public DateTime DateTimeAdded {get; set;}
        public DateTime LastUpdated {get; set;}

        public List<User> ReadUsers(string name = "")
        {
            var users = new List<User>();

            users = DBContext.mongoConnect<User>(Constants.USER).Find(x => x.FirstName == name || name=="").ToList();
            return users;
        }
    }
}