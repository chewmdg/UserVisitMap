using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserVisitMap.Models;

namespace UserVisitMap.Controllers
{
    [Route("api/[controller]")]
    public class UserVisitController : Controller
    {
        // GET api/values
        public IEnumerable<UserVisit> Get([FromQuery]string user_id = "")
        {
            var userVisits = new UserVisit();
            
            ClaimsPrincipal claimPrincipal = HttpContext.User;

            return userVisits.ReadUserVisit(claimPrincipal);
            
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
