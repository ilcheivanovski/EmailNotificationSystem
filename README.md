# Email Processor Service

Created a Web API service with React, named AdminUI, where users can manage and send notifications. On the backend, the notifications are sent to an EmailProcessorService, which consumes the bulk of emails from RabbitMQ. This setup allows the system to handle message queues efficiently and execute email sending in parallel, ensuring high scalability for processing large volumes of emails.

To enhance scalability and fault tolerance, I incorporated Docker Compose to run multiple instances of the server, enabling load distribution and higher throughput. Each email processing task runs asynchronously, leveraging parallel processing capabilities to handle concurrent email dispatch.

The service also supports configurable email templates and client-specific settings, all managed through the Admin UI. I utilized Microsoft technologies for the core architecture, and the solution includes ASP.NET Core Web API, RabbitMQ, Docker for containerization, and React for the front-end interface. To facilitate seamless event-driven communication, I implemented event triggers that initiate email dispatch whenever relevant data is sent via the message queue.

For data management, I used XML to handle client data, with support for large datasets exceeding 100,000 records. This ensures the system can efficiently handle mass email campaigns.
