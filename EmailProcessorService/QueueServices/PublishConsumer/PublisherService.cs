using CommonResources;
using Kanny.Infrastructure.SendGrid;
using MassTransit;

namespace EmailProcessorService.QueueServices.PublishConsumer
{
    public class PublisherService : IConsumer<Client>
    {
        private readonly IEmailService _emailService;
        public PublisherService(IEmailService emailService)
        {
            _emailService = emailService;
        }
        public async Task Consume(ConsumeContext<Client> context)
        {
            var client = context.Message;
            //email send logic here
            try
            {
                await _emailService.SendMail(client.ReceiverEmail, $"{client.FirstName} {client.LastName}", $"Email for {client.FirstName} {client.LastName}", "", client.Template.Content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

    }
}
