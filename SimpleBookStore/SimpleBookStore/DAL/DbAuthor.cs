using System.Collections.Generic;

namespace SimpleBookStore.DAL
{
    public class DbAuthor
    {
        public int Id { get; set; } 
        public int BookId { get; set; } 
        public string FirstName { get; set; } 
        public string LastName { get; set; }
    }
}