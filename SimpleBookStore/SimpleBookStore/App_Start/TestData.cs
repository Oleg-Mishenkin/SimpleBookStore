using System;
using Microsoft.Practices.ServiceLocation;
using SimpleBookStore.DAL;

namespace SimpleBookStore.App_Start
{
    public static class TestData
    {
        public static void InitTestData()
        {
            var booksRepository = ServiceLocator.Current.GetInstance<IBookRepository>();
            var authorsRepository = ServiceLocator.Current.GetInstance<IAuthorRepository>();

            var book1Id = booksRepository.Create(new DbBook
            {
                Title = "Mastering Bitcoin: Programming the Open Blockchain",
                Pages = 363,
                ISBN = "978-1491954386",
                Publisher = "O'Reilly",
                PublishDate = new DateTime(2017, 7, 7),
            });

            authorsRepository.Create(new DbAuthor
            {
                BookId = book1Id,
                FirstName = "Andreas",
                LastName = "M. Antonopoulos"
            });

            var book2Id = booksRepository.Create(new DbBook
            {
                Title = "C# 6.0 and the .NET 4.6 Framework",
                Pages = 1329,
                ISBN = "1484213335",
                Publisher = "Apress",
                PublishDate = new DateTime(2016, 11, 17),
            });

            authorsRepository.Create(new DbAuthor
            {
                BookId = book2Id,
                FirstName = "ANDREW",
                LastName = "TROELSEN"
            });

            authorsRepository.Create(new DbAuthor
            {
                BookId = book2Id,
                FirstName = "Philip",
                LastName = "Japikse"
            });
        }
    }
}