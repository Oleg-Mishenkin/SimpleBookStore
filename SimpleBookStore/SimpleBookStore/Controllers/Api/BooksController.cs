﻿using System.Collections.Generic;
using System.Web.Http;

namespace SimpleBookStore.Controllers.Api
{
    public class BooksController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "book1", "book2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}