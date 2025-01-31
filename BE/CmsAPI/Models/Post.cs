namespace CmsAPI.Models
{
    public class Post
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public required string title { get; set; }
        public required string content { get; set; }
        public required string tags { get; set; }
        public DateTime posted_date { get; set; }
    }
}
