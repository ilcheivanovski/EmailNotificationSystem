namespace CommonResources
{
    public class Client
    {
        public string ID { get; set; }
        public string ReceiverEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PlainTextContent { get; set; }
        public Template Template { get; set; } // Single template
    }
}
