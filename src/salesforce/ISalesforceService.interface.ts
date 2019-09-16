export interface ISalesforceService {
  getToken(): Promise<string>;
  sendMessage(token: string, message: string): Promise<void>;
}
