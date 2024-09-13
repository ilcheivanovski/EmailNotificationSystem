using AdminUI.Server.Helpers;
using CommonResources;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace AdminUI.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : Controller
    {
        private readonly IBus _bus;

        public EmailController(IBus bus)
        {
            _bus = bus;
        }

        [HttpPost("send-email-event")]
        public async Task<IActionResult> PublishEvent()
        {
            string filePath = @"./Clients/Clients.xml";
            string templatesDirectory = @"./Templates";
            List<Client> clients = XMLParser.ParseClients(filePath, templatesDirectory);

            await _bus.PublishBatch(clients);
            return Ok("Event published successfully");
        }

        [HttpPost("publish-ten-thousand")]
        public async Task<IActionResult> PublishMillionEvent()
        {
            string filePath = @"./Clients/TenThousandClients.xml";
            string templatesDirectory = @"./Templates";
            List<Client> clients = XMLParser.ParseClients(filePath, templatesDirectory);

            await _bus.PublishBatch(clients);

            return Ok("Event published successfully");
        }

        [HttpPost("generate-million")]
        public async Task<IActionResult> GenerateEvent()
        {
             XMLGenerator.GenerateXml(1000000);

            return Ok("Event published successfully");
        }

    }
}
