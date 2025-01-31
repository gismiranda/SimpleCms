using System.ComponentModel.DataAnnotations.Schema;

namespace CmsAPI.Models
{
    public class User
    {
        public int id { get; set; }
        public required string name { get; set; }
        public required string email { get; set; }
        public string? password_hash { get; set; }
        
        [NotMapped]
        public string password { get; set; }
        public DateTime created_at { get; set; } 
        public DateTime updated_at { get; set; }
         
    }
}
