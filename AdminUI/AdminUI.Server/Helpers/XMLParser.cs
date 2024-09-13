using CommonResources;
using System.Xml.Linq;

namespace AdminUI.Server.Helpers
{
    public class XMLParser
    {
        public static List<Client> ParseClients(string xmlFilePath, string templatesDirectory)
        {
            List<Client> clients = new List<Client>();

            // Load the XML file
            XDocument doc = XDocument.Load(xmlFilePath);

            // Parse the Clients
            foreach (XElement clientElement in doc.Descendants("Client"))
            {
                var templateName = clientElement.Element("Template")?.Element("Name")?.Value;
                var templateFilePath = Path.Combine(templatesDirectory, templateName);

                Client client = new Client
                {
                    ID = clientElement.Attribute("ID").Value,
                    ReceiverEmail = clientElement.Element("ReceiverEmail")?.Value,
                    FirstName = clientElement.Element("FirstName")?.Value,
                    LastName = clientElement.Element("LastName")?.Value,
                    PlainTextContent = clientElement.Element("PlainTextContent")?.Value,
                    Template = new Template
                    {
                        Id = clientElement.Element("Template")?.Attribute("Id")?.Value,
                        Name = templateName,
                        MarketingData = clientElement.Element("Template")?.Element("MarketingData")?.Value,
                        Content = File.Exists(templateFilePath) ? File.ReadAllText(templateFilePath) : "Template file not found."
                    }
                };

                clients.Add(client);
            }

            return clients;
        }
    }
}
