using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<RestApi.Models.Ticket> Ticket { get; set; } = default!;
        public DbSet<RestApi.Models.TicketReply> TicketReply { get; set; } = default!;
    }
