using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApi.Models;
using RestApi.Models.DTOs;
using RestApi.Models.Responses;

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TicketsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<OkObjectResult> GetTickets(int page = 1, int rowsPerPage = 5)
        {
            var totalCount = await _context.Ticket.CountAsync();
            var tickets =  _context.Ticket
                .Include(r => r.Priority)
                .Include(r => r.Status)
                .Include(r => r.TicketType)
                .Select(t =>
                    new AllTicketsResponse {
                        Id = t.Id,
                        Title = t.Title,
                        ApplicationName = t.ApplicationName,
                        Priority = new PriorityResponse
                        {
                            Id = t.Priority.Id,
                            Title = t.Priority.Title
                        },
                        Status = new StatusResponse
                        {
                            Id = t.Status.Id,
                            Title = t.Status.Title
                        },
                        TicketType = new TicketTypeResponse
                        {
                            Id = t.TicketType.Id,
                            Title = t.TicketType.Title
                        }
                    })
                .Skip(rowsPerPage * (page - 1))
                .Take(rowsPerPage)
                .ToListAsync();

            return Ok(new { totalCount, tickets = tickets.Result });
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketResponse>> GetTicket(long id)
        {
            var ticket = await _context.Ticket
                .Include(r => r.Priority)
                .Include(r => r.Status)
                .Include(r => r.TicketType)
                .Include(r => r.TicketReplies)
                .Select(t =>
                    new TicketResponse {
                    Id = t.Id,
                    Title = t.Title,
                    ApplicationName = t.ApplicationName,
                    Description = t.Description,
                    Priority = new PriorityResponse
                    {
                        Id = t.Priority.Id,
                        Title = t.Priority.Title
                    },
                    Status = new StatusResponse
                    {
                        Id = t.Status.Id,
                        Title = t.Status.Title
                    },
                    TicketType = new TicketTypeResponse
                    {
                        Id = t.TicketType.Id,
                        Title = t.TicketType.Title
                    },
                    TicketReplies = t.TicketReplies.Select(tr => new
                    TicketReplyResponse {
                        TId = tr.TId,
                        ReplyDate = tr.ReplyDate,
                        ReplyId = tr.ReplyId,
                        Reply = tr.Reply
                    }).ToList()
                })
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync();

            if (ticket == null)
            {
                return NotFound();
            }
            
            return ticket;
        }

        // POST: api/Tickets/5/Replies
        [HttpPost("{id}/Replies")]
        public Task<IActionResult> AddTicketReply(int id, AddReplyDTO body)
        {
            
            try
            {
                var replyDto = new TicketReply
                {
                    TId = id,
                    Reply = body.reply,
                    ReplyDate = DateTime.Now
                };
                
                _context.TicketReply.Add(replyDto);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return Task.FromResult<IActionResult>(NotFound());
                }
                throw;
            }

            return Task.FromResult<IActionResult>(NoContent());
        }

        private bool TicketExists(long id)
        {
            return _context.Ticket.Any(e => e.Id == id);
        }
    }
}