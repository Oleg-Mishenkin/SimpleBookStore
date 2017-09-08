using System;

namespace SimpleBookStore.DAL
{
    public class DbBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Pages { get; set; }
        public string Publisher { get; set; }
        public DateTime PublishDate { get; set; }
        public string ISBN { get; set; }
        public byte[] Image { get; set; }
    }
}