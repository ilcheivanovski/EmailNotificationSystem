namespace EmailProcessorService.Infrastructure.Sendgrid
{
    public class SendGridOptions
    {
        public string SendGridApiKey { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
    }
}
