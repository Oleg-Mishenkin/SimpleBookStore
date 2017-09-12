using System;
using System.Collections.Generic;
using System.Linq;
using SimpleBookStore.DAL;
using SimpleBookStore.ViewModels;

namespace SimpleBookStore.Managers
{
    public class BookStoreManager : IBookStoreManager
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;

        public BookStoreManager(IBookRepository bookRepository, IAuthorRepository authorRepository)
        {
            _bookRepository = bookRepository;
            _authorRepository = authorRepository;
        }

        public IList<BookListViewModel> GetAllBooks()
        {
            var authors = _authorRepository.GetAll();
            var books = _bookRepository.GetAll();

            return books.Select(x => new BookListViewModel
            {
                Id = x.Id,
                Pages = x.Pages,
                PublishDate = x.PublishDate,
                Publisher = x.Publisher,
                Image = x.Image,
                Title = x.Title,
                ISBN = x.ISBN,
                Authors = authors.Where(author => author.BookId == x.Id).Select(author => new AuthorViewModel
                {
                    Id = author.Id,
                    AuthorLastName = author.LastName,
                    AuthorFirstName = author.FirstName
                }).ToList()
            }).ToList();
        }

        public BookListViewModel GetBook(int id)
        {
            return GetAllBooks().FirstOrDefault(x => x.Id == id);
        }

        public IList<AuthorEditModel> GetBookAuthors(int bookId)
        {
            return _authorRepository.GetAllForBook(bookId).Select(x => new AuthorEditModel
            {
                Id = x.Id,
                BookId = bookId,
                AuthorLastName = x.LastName,
                AuthorFirstName = x.FirstName
            }).ToList();
        }

        public int Create(BookCreateModel model)
        {
            var book = new DbBook();
            book.ISBN = model.ISBN;
            book.Image = model.Image;
            book.Pages = model.Pages;
            book.PublishDate = model.PublishDate;
            book.Publisher = model.Publisher;
            book.Title = model.Title;
            
            var id =_bookRepository.Create(book);
            var author = new DbAuthor();
            author.BookId = id;
            author.FirstName = model.AuthorFirstName;
            author.LastName = model.AuthorLastName;
            _authorRepository.Create(author);

            return id;
        }

        public void Update(BookEditModel model)
        {
            _bookRepository.Update(new DbBook
            {
                Id = model.Id,
                Pages = model.Pages,
                PublishDate = model.PublishDate,
                Publisher = model.Publisher,
                Title = model.Title,
                ISBN = model.ISBN
            });
        }

        public int AddAuthor(AuthorCreateModel model)
        {
            return _authorRepository.Create(new DbAuthor
            {
                BookId = model.BookId,
                FirstName = model.AuthorFirstName,
                LastName = model.AuthorLastName
            });
        }

        public void UpdateAuthor(AuthorEditModel model)
        {
            _authorRepository.Update(new DbAuthor
            {
                Id = model.Id,
                BookId = model.BookId,
                FirstName = model.AuthorFirstName,
                LastName = model.AuthorLastName
            });
        }

        public void RemoveAuthor(int bookId, int authorId)
        {
            var bookAuthors = _authorRepository.GetAllForBook(bookId);
            if (bookAuthors.Count == 1)
            {
                if (bookAuthors[0].Id == authorId)
                    throw new InvalidOperationException("Can't remove single author from book");
                return;
            }

            _authorRepository.Delete(authorId);
        }

        public void Delete(int id)
        {
            _authorRepository.DeleteForBook(id);
            _bookRepository.Delete(id);
        }
    }
}