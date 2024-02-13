using System.ComponentModel.DataAnnotations.Schema;

namespace RestApi.Models;

[Table("TicketType", Schema = "Support")]
public class TicketType
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
