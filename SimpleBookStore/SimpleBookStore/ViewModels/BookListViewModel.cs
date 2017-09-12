using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleBookStore.ViewModels
{
    public class BookListViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Pages { get; set; }

        public string Publisher { get; set; }

        public DateTime PublishDate { get; set; }

        public string ISBN { get; set; }

        public string Image { get; set; }

        public IList<AuthorViewModel> Authors { get; set; } 
    }
}