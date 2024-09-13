export interface ITemplate {
  id?: string;
  marketingData: string;
  name: string;
  content: string;
}

export interface IClient {
  id?: string;
  firstName: string;
  lastName: string;
  plainTextContent: string;
  receiverEmail: string;
  template: ITemplate;
}
