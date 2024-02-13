namespace RestApi.Models.Responses;

public class PriorityResponse
{
    public int Id { get; set; }

    public string? Title { get; set; }   
}

public class StatusResponse
{
    public int Id { get; set; }

    public string? Title { get; set; }   
}

public class TicketTypeResponse
{
    public int Id { get; set; }

    public string? Title { get; set; }   
}

public class TicketReplyResponse
{
    public int ReplyId { get; set; }

    public long TId { get; set; }

    public string? Reply { get; set; }

    public DateTime ReplyDate { get; set; }
}
public class TicketResponse
{
    public long? Id { get; set; }

    public string? Title { get; set; }
    
    public string? ApplicationName { get; set; }
    
    public string? Description { get; set; }
    
    public PriorityResponse? Priority { get; set; }
    
    public StatusResponse? Status { get; set; }
    
    public TicketTypeResponse? TicketType { get; set; }
    
    public ICollection<TicketReplyResponse>? TicketReplies { get; set; }
}

public class AllTicketsResponse
{
    public long? Id { get; set; }

    public string? Title { get; set; }
    
    public string? ApplicationName { get; set; }
    
    public PriorityResponse? Priority { get; set; }
    
    public StatusResponse? Status { get; set; }
    
    public TicketTypeResponse TicketType { get; set; } = null!;
}

