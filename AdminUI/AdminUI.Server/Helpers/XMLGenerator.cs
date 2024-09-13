using System.Xml;

namespace AdminUI.Server.Helpers
{
    public class XMLGenerator
    {
        public static void GenerateXml(int numClients)
        {
            using (XmlWriter writer = XmlWriter.Create("clients1.xml", new XmlWriterSettings { Indent = true }))
            {
                writer.WriteStartDocument();
                writer.WriteStartElement("Clients");

                for (int i = 1; i <= numClients; i++)
                {
                    writer.WriteStartElement("Client");
                    writer.WriteAttributeString("ID", i.ToString());
                    writer.WriteElementString("ReceiverEmail", $"client{i}@example.com");
                    writer.WriteElementString("FirstName", (i % 2 == 1) ? "John" : "Jane");
                    writer.WriteElementString("LastName", (i % 2 == 1) ? "Doe" : "Smith");
                    writer.WriteElementString("PlainTextContent", "");
                    writer.WriteStartElement("Template");
                    writer.WriteAttributeString("Id", (i % 2 == 1) ? "1" : "2");
                    writer.WriteElementString("Name", (i % 2 == 1) ? "Template1.html" : "Template2.html");
                    writer.WriteElementString("MarketingData", (i % 2 == 1) ? "{\"title\": \"Sale\", \"discount\": \"20%\"}" : "{\"title\": \"New Arrivals\", \"items\": [\"Shoes\", \"Bags\"]}");
                    writer.WriteEndElement(); // Template
                    writer.WriteEndElement(); // Client
                }

                writer.WriteEndElement(); // Clients
                writer.WriteEndDocument();
            }
        }
    }

}
