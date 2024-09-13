using AdminUI.Server.Helpers;
using AdminUI.Server.ViewModels;
using CommonResources;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace AdminUI.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientsController : Controller
    {
        string xmlFilePath = @"./Clients/Clients.xml";

        private readonly IBus _bus;

        public ClientsController(IBus bus)
        {
            _bus = bus;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllClients()
        {
            string filePath = @"./Clients/Clients.xml";
            string templatesDirectory = @"./Templates";
            List<Client> clients = XMLParser.ParseClients(filePath, templatesDirectory);

            return Ok(clients);
        }
        [HttpPost("add")]
        public IActionResult AddClient([FromBody] ClientModel newClient)
        {
            XMLCrud.AddClient(xmlFilePath, newClient);
            return Ok("Client added successfully.");
        }

        [HttpPut("edit/{id}")]
        public IActionResult EditClient(string id, [FromBody] ClientModel updatedClient)
        {
            XMLCrud.EditClient(xmlFilePath, id, updatedClient);
            return Ok("Client updated successfully.");
        }
    }
}
