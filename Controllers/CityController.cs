using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserVisitMap.Models;

namespace UserVisitMap.Controllers
{
    [Route("api/[controller]")]
    public class CityController : Controller
    {
        // GET api/values
        [HttpGet]
        //[Route("")]
        //[Route("{regionName}")]
        public IEnumerable<City> Get([FromQuery]string regionName = "")
        {
            var city = new City();

            return city.ReadCities(regionName);
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
