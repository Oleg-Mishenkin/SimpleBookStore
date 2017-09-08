using System;
using System.Collections.Generic;
using System.Linq;

namespace SimpleBookStore.DAL
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly List<DbAuthor> _authors;
        public AuthorRepository()
        {
            _authors = new List<DbAuthor>();
        }

        public DbAuthor Get(int id)
        {
            var author = _authors.FirstOrDefault(x => x.Id == id);
            if (author == null) throw new InvalidOperationException("Cannot find book with id " + id);
            return author;
        }

        public int Create(DbAuthor author)
        {
            var newId = _authors.Any() ? (_authors.Max(x => x.Id) + 1) : 1;
            author.Id = newId;
            _authors.Add(author);

            return newId;
        }

        public IList<DbAuthor> GetAll()
        {
            return _authors;
        }

        public IList<DbAuthor> GetAllForBook(int bookId)
        {
            return _authors.Where(x => x.BookId == bookId).ToList();
        }

        public void DeleteForBook(int bookId)
        {
            _authors.RemoveAll(x => x.BookId == bookId);
        }

        public void Delete(int authorId)
        {
            var author = Get(authorId);
            _authors.Remove(author);
        }
    }
}