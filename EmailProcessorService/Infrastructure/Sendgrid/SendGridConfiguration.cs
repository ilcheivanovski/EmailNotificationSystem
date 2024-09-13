using Kanny.Infrastructure.SendGrid;

namespace EmailProcessorService.Infrastructure.Sendgrid
{
    public static class SendGridConfiguration
    {
        public static void ConfigureSendGrid(this IServiceCollection services, IConfiguration configuration)
        {
            var sendGridOptions = configuration.GetSection("SendGrid");

            services.AddOptions<SendGridOptions>().Configure(options =>
            {
                options.SendGridApiKey = sendGridOptions["ApiKey"];
                options.FromEmail = sendGridOptions["FromEmail"];
                options.FromName = sendGridOptions["FromName"];
            });

            services.AddTransient<IEmailService, EmailService>();
        }
    }
}
