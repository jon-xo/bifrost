using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace bifrost.Models
{
    public class UserAccount
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        [MaxLength(32)]
        public string DisplayName { get; set; }

        [Required]
        [MaxLength(255)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public DateTime? CreateDateTime { get; set; }

        [MaxLength(255)]
        [DataType(DataType.Url)]
        public string ImageLocation { get; set; }

        [MaxLength(280)]
        public string UserSummary { get; set; }

        [Required]
        public Boolean Private { get; set; }

    }
}
