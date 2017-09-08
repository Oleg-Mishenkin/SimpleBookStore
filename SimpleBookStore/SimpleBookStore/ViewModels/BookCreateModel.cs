using System;
using System.ComponentModel.DataAnnotations;

namespace SimpleBookStore.ViewModels
{
    public class BookCreateModel
    {
        [Required]
        [StringLength(30, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string Title { get; set; }

        [Required]
        [Range(1, 10000, ErrorMessage = "The {0} must be between {1} and {2} range")]
        public int Pages { get; set; }

        [StringLength(30, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string Publisher { get; set; }

        [Range(typeof(DateTime), "1/1/1800", "12/31/9999", ErrorMessage = "Value for {0} must be between {1} and {2}")]
        public DateTime PublishDate { get; set; }

        [RegularExpression(@"^(97(8|9))?\d{9}(\d|X)$", ErrorMessage = "ISBN must fit the pattern")]
        public string ISBN { get; set; }

        public byte[] Image { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string AuthorFirstName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string AuthorLastName { get; set; }
    }
}