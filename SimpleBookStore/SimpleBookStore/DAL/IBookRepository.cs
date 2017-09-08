using System.Collections.Generic;

namespace SimpleBookStore.DAL
{
    public interface IBookRepository
    {
        IList<DbBook> GetAll();

        DbBook Get(int id);

        void Update(DbBook book);

        int Create(DbBook book);

        void Delete(int bookId);
    }
}