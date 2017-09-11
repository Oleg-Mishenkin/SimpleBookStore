using System.Collections.Generic;

namespace SimpleBookStore.DAL
{
    public interface IAuthorRepository
    {
        DbAuthor Get(int id);

        int Create(DbAuthor author);

        void Update(DbAuthor author);

        IList<DbAuthor> GetAll();

        IList<DbAuthor> GetAllForBook(int bookId);

        void DeleteForBook(int bookId);

        void Delete(int authorId);
    }
}
