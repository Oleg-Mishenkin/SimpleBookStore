using System.Collections.Generic;
using System.Web.Http;
using SimpleBookStore.Managers;
using SimpleBookStore.ViewModels;

namespace SimpleBookStore.Controllers.Api
{
    public class AuthorsController : ApiController
    {
        private readonly IBookStoreManager _bookStoreManager;

        public AuthorsController(IBookStoreManager bookStoreManager)
        {
            _bookStoreManager = bookStoreManager;
        }

        [HttpGet]
        public IList<AuthorEditModel> Get(int id)
        {
            return _bookStoreManager.GetBookAuthors(id);
        }

        [HttpPost]
        public IHttpActionResult Post(AuthorEditModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _bookStoreManager.AddAuthor(model);
            return Created(Url.Content($"/edit/{model.BookId}"), model);
        }

        [HttpDelete]
        [Route("api/authors/{bookId}/{authorId}")]
        public IHttpActionResult Delete(int bookId, int authorId)
        {
            _bookStoreManager.RemoveAuthor(bookId, authorId);

            return Ok();
        }
    }
}