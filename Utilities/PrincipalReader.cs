using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UserVisitMap.Utilities
{
    public static class PrincipalReader
    {
        public static Claim ReadPrincipal(ClaimsPrincipal principal, string principalType)
        {
            var claim = principal.Claims.FirstOrDefault((x)=>x.Type == principalType);

            return claim;
        }
    }
}