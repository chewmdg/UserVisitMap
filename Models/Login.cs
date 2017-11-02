using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace UserVisitMap.Models
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public ClaimsPrincipal Principal {get; set;}
        private List<Claim> Claims {get; set;}

        public bool Authenticate(){
            Claims = new List<Claim>();
            if (LoginUser(Username, Password))
            {
                Claims.Add(new Claim(ClaimTypes.Name, Username));
                Claims.Add(new Claim("IsAuthenticated", "True"));

                var userIdentity = new ClaimsIdentity(Claims, "login");

                Principal = new ClaimsPrincipal(userIdentity);
                
                return true;
            }
            return false;
        }

        private bool LoginUser(string username, string password)
        {
            //As an example. This method would go to our data store and validate that the combination is correct. 
            //For now just return true. 
            var user = new User();

            if(user.ReadUser(username, password))
            {
                Claims.Add(new Claim("_id", user._id));

                return true;
            }

            return false;
        }

    }
}