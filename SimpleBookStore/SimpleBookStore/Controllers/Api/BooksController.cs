using System.Collections.Generic;
using System.Web.Http;
using SimpleBookStore.Managers;
using SimpleBookStore.ViewModels;

namespace SimpleBookStore.Controllers.Api
{
    public class BooksController : ApiController
    {
        private readonly IBookStoreManager _bookStoreManager;

        public BooksController(IBookStoreManager bookStoreManager)
        {
            _bookStoreManager = bookStoreManager;
        }

        [HttpGet]
        public IList<BookListViewModel> Get()
        {
            return _bookStoreManager.GetAllBooks();
        }

        [HttpPost]
        public IHttpActionResult Post(BookCreateModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = _bookStoreManager.Create(model);
            return Created(Url.Content($"/edit/{id}"), model);
        }

        [HttpPut]
        public IHttpActionResult Put(BookEditModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _bookStoreManager.Update(model);

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            _bookStoreManager.Delete(id);

            return Ok();
        }
    }
}
