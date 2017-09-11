using System.Collections.Generic;
using SimpleBookStore.ViewModels;

namespace SimpleBookStore.Managers
{
    public interface IBookStoreManager
    {
        IList<BookListViewModel> GetAllBooks();
        BookListViewModel GetBook(int id);
        IList<AuthorEditModel> GetBookAuthors(int bookId);
        int Create(BookCreateModel model);
        void Update(BookEditModel model);
        int AddAuthor(AuthorCreateModel model);
        void UpdateAuthor(AuthorEditModel model);
        void RemoveAuthor(int bookId, int authorId);
        void Delete(int id);
    }
}
