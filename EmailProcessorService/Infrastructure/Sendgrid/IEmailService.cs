using SendGrid.Helpers.Mail;

namespace Kanny.Infrastructure.SendGrid
{
    public interface IEmailService
    {
        Task SendMail(string to, string toName, string subject, string plainTextContent, string htmlContent);
    }
}
