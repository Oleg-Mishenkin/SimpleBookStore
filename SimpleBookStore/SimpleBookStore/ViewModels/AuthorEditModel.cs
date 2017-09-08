using System.ComponentModel.DataAnnotations;

namespace SimpleBookStore.ViewModels
{
    public class AuthorEditModel
    {
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string AuthorFirstName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be maximum {1} characters long")]
        public string AuthorLastName { get; set; }
    }
}