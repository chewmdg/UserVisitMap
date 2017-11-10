using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Linq;
using UserVisitMap.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net.Http;
using System.Net;

namespace UserVisitMap.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<HttpResponseMessage> Logout()
        {
            await HttpContext.SignOutAsync();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("IsAuthenticated")]
        public bool IsAuthenticated()
        {
            ClaimsPrincipal claimPrincipal = HttpContext.User;
            if(claimPrincipal == null)
            {
                return false;
            }

            var claim = claimPrincipal.Claims.FirstOrDefault((x)=>x.Type == "IsAuthenticated");

            return (claim != null);
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] Login loginModel)
        {
            if(loginModel.Authenticate()){
                await HttpContext.SignInAsync(loginModel.Principal); // CookieAuthenticationDefaults.AuthenticationScheme
                return Redirect("/");
            }

            return Redirect("/auth/login.html");
        }
    }
}