using System;
using System.Collections.Generic;
using System.Linq;

namespace SimpleBookStore.DAL
{
    public class BookRepository : IBookRepository
    {
        private readonly List<DbBook> _books; 
        public BookRepository()
        {
            _books = new List<DbBook>();
        }

        public IList<DbBook> GetAll()
        {
            return _books;
        }

        public DbBook Get(int id)
        {
            var book = _books.FirstOrDefault(x => x.Id == id);
            if (book == null) throw new InvalidOperationException("Cannot find book with id " + id);
            return book;
        }

        public void Update(DbBook book)
        {
            var dbbook = Get(book.Id);
            dbbook.ISBN = book.ISBN;
            dbbook.Pages = book.Pages;
            dbbook.Title = book.Title;
            dbbook.Publisher = book.Publisher;
            dbbook.PublishDate = book.PublishDate;
            dbbook.Image = book.Image;
        }

        public int Create(DbBook book)
        {
            var newId = _books.Any() ? (_books.Max(x => x.Id) + 1) : 1;
            book.Id = newId;
            _books.Add(book);

            return newId;
        }

        public void Delete(int bookId)
        {
            var book = Get(bookId);
            _books.Remove(book);
        }
    }
}