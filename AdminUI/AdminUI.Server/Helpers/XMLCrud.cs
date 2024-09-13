using AdminUI.Server.ViewModels;
using System.Xml.Linq;

namespace AdminUI.Server.Helpers
{
    public class XMLCrud
    {
        public static void AddClient(string xmlFilePath, ClientModel newClient)
        {
            var xmlDoc = XDocument.Load(xmlFilePath);

            Random random = new Random();
            int randomNumber = random.Next();

            XElement newClientElement = new XElement("Client",
            new XAttribute("ID", random),
                new XElement("ReceiverEmail", newClient.ReceiverEmail),
                new XElement("FirstName", newClient.FirstName),
                new XElement("LastName", newClient.LastName),
                new XElement("PlainTextContent", newClient.PlainTextContent),
            new XElement("Template",
                    new XAttribute("Id", newClient.Template.Id),
                    new XElement("Name", newClient.Template.Name),
                    new XElement("MarketingData", newClient.Template.MarketingData)
                )
            );

            xmlDoc.Root.Add(newClientElement);
            xmlDoc.Save(xmlFilePath);
        }
        public static void EditClient(string xmlFilePath, string id, ClientModel updatedClient)
        {
            var xmlDoc = XDocument.Load(xmlFilePath);
            var client = xmlDoc.Root.Elements("Client")
                .FirstOrDefault(c => c.Attribute("ID")?.Value == id);

            client.SetElementValue("ReceiverEmail", updatedClient.ReceiverEmail);
            client.SetElementValue("FirstName", updatedClient.FirstName);
            client.SetElementValue("LastName", updatedClient.LastName);
            client.SetElementValue("PlainTextContent", updatedClient.PlainTextContent);

            var template = client.Element("Template");
            if (template != null)
            {
                template.SetAttributeValue("Id", updatedClient.Template.Id);
                template.SetElementValue("Name", updatedClient.Template.Name);
                template.SetElementValue("MarketingData", updatedClient.Template.MarketingData);
            }

            xmlDoc.Save(xmlFilePath);
        }
        public static void DeleteClient(string xmlFilePath, string id)
        {
            // Load the XML document
            var xmlDoc = XDocument.Load(xmlFilePath);

            // Find the client with the specified ID
            var client = xmlDoc.Root.Elements("Client")
                .FirstOrDefault(c => c.Attribute("ID")?.Value == id);

            // If the client is found, remove it from the XML
            if (client != null)
            {
                client.Remove();
                xmlDoc.Save(xmlFilePath);
            }
            else
            {
                // Optional: Handle case where the client was not found
                Console.WriteLine($"Client with ID {id} not found.");
            }
        }
    }
}
