using System.ComponentModel.DataAnnotations.Schema;

namespace RestApi.Models;

[Table("Status", Schema = "Support")]
public class Status
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
