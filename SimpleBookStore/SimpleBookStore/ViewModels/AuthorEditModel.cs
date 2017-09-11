using System.ComponentModel.DataAnnotations;

namespace SimpleBookStore.ViewModels
{
    public class AuthorEditModel : AuthorCreateModel
    {
        [Required]
        public int Id { get; set; }
    }
}