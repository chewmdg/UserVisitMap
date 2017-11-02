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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateTimeAdded { get; set; }
        public DateTime LastUpdated { get; set; }

        public List<User> ReadUsers(string name = "")
        {
            var users = new List<User>();

            users = DBContext.mongoConnect<User>(Constants.USER).Find(x => x.FirstName == name || name == "").ToList();
            return users;
        }

        public bool ReadUser(string username, string password)
        {
            var user = new User();

            user = DBContext.mongoConnect<User>(Constants.USER).Find(x => x.Username == username && x.Password == password).FirstOrDefault();

            if (user != null)
            {
                //only creates on instance of user instead of 2
                _id = user._id;
                FirstName = user.FirstName;
                LastName = user.LastName;
                Username = user.Username;
                Password = user.Password;
                DateAdded = user.DateAdded;
                DateTimeAdded = user.DateTimeAdded;
                LastUpdated = user.LastUpdated;

                return true;
            }
            return false;
        }
    }
}