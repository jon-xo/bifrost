using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace bifrost.Models
{
    public class SavedContent
    {
        public int Id { get; set; }

        [Required]
        
        public string UserId { get; set; }
        [MaxLength(15)]
        public string CVApiKey { get; set; }

        [MaxLength(15)]
        public string PBApiKey { get; set; }
        public string Publisher { get; set; }
        
        [Required]
        public string Title { get; set; }
        public string Creators { get; set; }
        
        [Required]
        [MaxLength(512)]
        public string Description { get; set; }
        
        [Required]
        [DataType(DataType.Url)]
        public string ComicImage { get; set; }

        [Required]
        [MaxLength(10)]
        public string ComicType { get; set; }

        public DateTime? PublishDate { get; set; }

        [Required]
        public Boolean Read { get; set; }

        [Required]
        public DateTime? LastUpdated { get; set; }
        public string SeriesId { get; set; }
        public int? Rating { get; set; }

        [DisplayName("User")]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
