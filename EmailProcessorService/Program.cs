using EmailProcessorService;
using EmailProcessorService.Infrastructure.Sendgrid;
using EmailProcessorService.QueueServices.PublishConsumer;
using MassTransit;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<PublisherService>();
    x.UsingRabbitMq((context, config) =>
    {

        config.Host(new Uri("rabbitmq://localhost"), h =>
        {
            h.Username("guest");
            h.Password("guest");
            //h.ConfigureBatchPublish() 
        });
        config.ReceiveEndpoint("send-email-event", e =>
        {
            //e.PrefetchCount = 60;// Increase the prefetch count for more messages in flight
            //e.ConcurrentMessageLimit = 10; // Set the concurrency limit for consumers
            e.Consumer<PublisherService>(context);
            e.SingleActiveConsumer = true;
        });
    });
});
builder.Services.AddMassTransitHostedService();
builder.Services.ConfigureSendGrid(builder.Configuration);

var host = builder.Build();
host.Run();
