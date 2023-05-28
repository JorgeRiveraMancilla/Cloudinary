using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("photos")]
    public class AppPhoto
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("url")]
        public string Url { get; set; }
        [Column("public_id")]
        public string PublicId { get; set; }
    }
}