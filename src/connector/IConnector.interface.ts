export interface IConnector {
  processMessage(message: string): Promise<boolean>;
}
