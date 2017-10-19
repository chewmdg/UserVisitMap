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
            var client = new MongoClient(@"mongodb://uservisitmap:TCTRSPF6Jjl9YlniGWZfNNxNmTIzrQ2orBasfq1esGoVYuD3PJRsnSdzjL3vCIeD0J67jwFVTosZxKNYcwtvfA==@uservisitmap.documents.azure.com:10255/?ssl=true&replicaSet=globaldb");
            var database = client.GetDatabase("UserVisitMap");
            return database.GetCollection<T>(document);
        }
    }
}