using EmailProcessorService.Infrastructure.Sendgrid;
using Microsoft.Extensions.Options;
using MimeKit.Text;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Text;
using System.Text.Json;

namespace Kanny.Infrastructure.SendGrid
{
    public class EmailService : IEmailService
    {
        private readonly SendGridClient _client;
        private readonly SendGridOptions _options;

        public EmailService(IOptions<SendGridOptions> options)
        {
            _options = options.Value;
            _client = new SendGridClient(_options.SendGridApiKey);
        }

        public async Task SendMail(string emailTo, string toName, string subject, string plainTextContent, string htmlContent)
        {
            var from = new EmailAddress(_options.FromEmail, _options.FromName);
            var to = new EmailAddress(emailTo, toName);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

           var res  = await _client.SendEmailAsync(msg);
        }
    }
}
