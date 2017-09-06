using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SimpleBookStore.Controllers.Api
{
    public class AuthorsController : ApiController
    {
        public IEnumerable<string> Get()
        {
            return new string[] { "author1", "author2" };
        }
    }
}