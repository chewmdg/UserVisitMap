using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

namespace UserVisitMap.Utilities
{
    public static class DBContext
    {
        public static IMongoCollection<T> mongoConnect<T>(string document)
        {
            var client = new MongoClient("CLIENTKEYHERE")
            var database = client.GetDatabase("UserVisitMap");
            return database.GetCollection<T>(document);
        }
    }
}
