using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestApi.Models;

[Table("TicketReply", Schema = "Support")]
public partial class TicketReply
{
    [Key]
    public int ReplyId { get; set; }

    public long TId { get; set; }

    public string? Reply { get; set; }

    public DateTime ReplyDate { get; set; }
    
    [ForeignKey("TId")]
    public virtual Ticket Ticket { get; set; } = null!;
}
