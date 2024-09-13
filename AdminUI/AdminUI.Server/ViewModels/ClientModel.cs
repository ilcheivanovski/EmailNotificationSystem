namespace AdminUI.Server.ViewModels
{
    public class ClientModel
    {
        public string ID { get; set; }
        public string ReceiverEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PlainTextContent { get; set; }
        public TemplateModel Template { get; set; }
    }
}
